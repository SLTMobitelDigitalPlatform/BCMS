import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import Swal from "sweetalert2";
import { useBCPForm } from "../../../../hooks/documents/bcp/useBCPForm";
import { useUsers } from "../../../../hooks/useUsers";

const CreateBCP = () => {
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    planNo: "",
    date: today,
    template: "",
    legalEntity: "",
    approver: "",
    maintainer: "",
    viewers: [],
    dateApproved: "",
    dateLastReviewed: "",
    dateDueForNextReview: "",
  });

  const navigate = useNavigate();

  const { sortedUsers, loading, error, fetchUsers } = useUsers();
  const { fetchLastBCPForm, addBCPForm } = useBCPForm();

  // Create Plan Number
  const createPlanNo = async () => {
    try {
      const response = await fetchLastBCPForm();

      // Check if response and response.data are valid
      if (response && response.data) {
        const lastRecord = response.data;

        // Extract plan number from the last record
        let lastPlanNo = lastRecord?.planNo || "P000"; // if no records, default to P000

        // Increment the numeric part of the plan number
        let numericPart = parseInt(lastPlanNo.slice(1)) + 1;

        // Format the new plan number as P001, P002, etc.
        let newPlanNo = `P${numericPart.toString().padStart(3, "0")}`;

        // Update formData with the new plan number
        setFormData((prevFormData) => ({
          ...prevFormData,
          planNo: newPlanNo,
        }));
      } else {
        // If no previous record, set the first plan number
        setFormData((prevFormData) => ({
          ...prevFormData,
          planNo: "P001", // First plan number
        }));
      }
    } catch (error) {
      console.error("Error creating plan number:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchLastBCPForm();
    createPlanNo();
  }, []);

  // const [loggedInUser, setLoggedInUsers] = useState([]);

  // const fetchLastBCPForm = async () => {
  //   try {
  //     const response = await axios.get(
  //       "http://localhost:5000/api/businessContinuityPlanBCPForm/last"
  //     );
  //     const lastRecord = response.data;

  //     const baseYear = 2024;
  //     const currentYear = new Date().getFullYear();
  //     const yearOffset = currentYear - baseYear + 1;

  //     let newVersionNo = `${yearOffset}.0`;
  //     let newSerialNo = 1;
  //     // console.log(newVersionNo);
  //     let lastVersionYearOffset;
  //     let lastIndex;

  //     if (lastRecord && lastRecord.versionNo) {
  //       lastVersionYearOffset = parseInt(
  //         lastRecord.versionNo.split(".")[0],
  //         10
  //       );
  //       lastIndex = parseInt(lastRecord.versionNo.split(".")[1], 10);
  //       newSerialNo = lastRecord.serialNo + 1;
  //     }

  //     if (lastVersionYearOffset === yearOffset) {
  //       newVersionNo = `${yearOffset}.${lastIndex + 1}`;
  //     }

  //     // console.log(newVersionNo);
  //     setPlanNo(newVersionNo);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // const fetchLoggedInUser = async () => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     const response = await axios.get("http://localhost:5000/currentuser", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     // console.log(response.data.name);

  //     setLoggedInUsers(response.data);
  //   } catch (error) {
  //     console.error("Error fetching user details:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchLastBCPForm();
  //   fetchLoggedInUser();
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addBCPForm(formData);
      handleSuccessAlert();
      navigate("/Business-Continuity-Plan/bcp-form");
    } catch (error) {
      handleErrorAlert();
      console.log(error);
    }
  };

  // Success Alert
  const handleSuccessAlert = () => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Record Added Successfully",
      showConfirmButton: false,
      timer: 2000,
    });
  };
  // Error Alert
  const handleErrorAlert = () => {
    Swal.fire({
      title: "Something Went Wrong",
      text: "Fix it and try again",
      icon: "error",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "viewers" ? value.split(",") : value, // Split viewers by commas
    });
  };

  const handleSelectChange = (selectedOption, name) => {
    setFormData({
      ...formData,
      [name]: selectedOption ? selectedOption.value : "",
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col w-full h-full">
      <h1 className="text-2xl font-bold text-green-500">
        Add New Business Continuity Plan
      </h1>
      <div className="bg-indigo-200 h-full mt-5 rounded-2xl p-8 overflow-auto">
        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="flex justify-between gap-10">
            <div className="flex flex-col gap-2 w-1/2">
              <label className="font-semibold">Plan Number</label>
              <input
                type="text"
                name="planNo"
                value={formData.planNo}
                // onChange={handleChange}
                disabled
                readOnly
                className="p-2 w-full rounded bg-white"
              />
            </div>
            <div className="flex flex-col gap-2 w-1/2">
              <label className="font-semibold">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="p-2 w-full rounded"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold">Template</label>
            <input
              type="text"
              name="template"
              value={formData.template}
              onChange={handleChange}
              placeholder="Enter template name"
              className="p-2 w-full rounded"
            />
          </div>

          <div className="flex justify-between gap-10">
            <div className="flex flex-col gap-2 w-full">
              <label className="font-semibold">Legal Entity</label>
              <Select
                options={sortedUsers}
                value={sortedUsers.find(
                  (user) => user.value === formData.legalEntity
                )}
                onChange={(option) => handleSelectChange(option, "legalEntity")}
                isClearable={true}
                placeholder="Select Legal Entity"
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label className="font-semibold">Approver</label>
              <Select
                options={sortedUsers}
                value={sortedUsers.find(
                  (user) => user.value === formData.approver
                )}
                onChange={(option) => handleSelectChange(option, "approver")}
                isClearable={true}
                placeholder="Select Approver"
              />
            </div>
          </div>

          <div className="flex justify-between gap-10">
            <div className="flex flex-col gap-2 w-full">
              <label className="font-semibold">Maintainer</label>
              <Select
                options={sortedUsers}
                value={sortedUsers.find(
                  (user) => user.value === formData.maintainer
                )}
                onChange={(option) => handleSelectChange(option, "maintainer")}
                isClearable={true}
                placeholder="Select Maintainer"
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label className="font-semibold">Viewers</label>
              <input
                type="text"
                name="viewers"
                value={formData.viewers}
                onChange={handleChange}
                placeholder="Enter viewers"
                className="p-2 w-full rounded"
              />
            </div>
          </div>

          <div className="flex justify-between gap-10">
            <div className="flex flex-col gap-2 w-1/2">
              <label className="font-semibold">Date Approved</label>
              <input
                type="date"
                name="dateApproved"
                value={formData.dateApproved}
                onChange={handleChange}
                className="p-2 w-full rounded"
              />
            </div>
            <div className="flex flex-col gap-2 w-1/2">
              <label className="font-semibold">Date Last Reviewed</label>
              <input
                type="date"
                name="dateLastReviewed"
                value={formData.dateLastReviewed}
                onChange={handleChange}
                className="p-2 w-full rounded"
              />
            </div>
            <div className="flex flex-col gap-2 w-1/2">
              <label className="font-semibold">Date Due for Next Review</label>
              <input
                type="date"
                name="dateDueForNextReview"
                value={formData.dateDueForNextReview}
                onChange={handleChange}
                className="p-2 w-full rounded"
              />
            </div>
          </div>

          <div className="flex justify-start gap-2">
            <button
              type="submit"
              className="p-2 w-32 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold"
            >
              Save
            </button>
            <Link
              to="/Business-Continuity-Plan/bcp-form"
              className="p-2 w-32 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold text-center"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBCP;
