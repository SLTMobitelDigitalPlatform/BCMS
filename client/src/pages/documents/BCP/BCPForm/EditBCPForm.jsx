import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import Swal from "sweetalert2";
import { useBCPForm } from "../../../../hooks/documents/bcp/useBCPForm";
import { useUsers } from "../../../../hooks/useUsers";

const EditBCPForm = () => {
  const [formData, setFormData] = useState({
    planNo: "",
    date: "",
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
  const { id } = useParams();

  const {
    sortedUsers,
    loading: usersLoading,
    error: usersError,
    fetchUsers,
  } = useUsers();

  const {
    businessContinuityPlan,
    loading: bcpLoading,
    error: bcpError,
    fetchBCPFormById,
    updateBCPForm,
  } = useBCPForm();

  useEffect(() => {
    fetchUsers();
    fetchBCPFormById(id);
  }, []);

  // Update formData when embeddedDocument is fetched
  useEffect(() => {
    if (businessContinuityPlan) {
      setFormData({
        planNo: businessContinuityPlan.planNo || "",
        date: businessContinuityPlan.date || "",
        template: businessContinuityPlan.template || "",
        legalEntity: businessContinuityPlan.legalEntity || "",
        approver: businessContinuityPlan.approver || "",
        maintainer: businessContinuityPlan.maintainer || "",
        viewers: businessContinuityPlan.viewers || [],
        dateApproved: businessContinuityPlan.dateApproved || "",
        dateLastReviewed: businessContinuityPlan.dateLastReviewed || "",
        dateDueForNextReview: businessContinuityPlan.dateDueForNextReview || "",
      });
    }
  }, [businessContinuityPlan]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateBCPForm(id, formData);
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
      title: "Record Updated Successfully",
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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (selectedOption, name) => {
    setFormData({
      ...formData,
      [name]: selectedOption ? selectedOption.value : "",
    });
  };

  if (usersLoading || bcpLoading) return <div>Loading...</div>;
  if (bcpError || usersError) return <div>Error loading data.</div>;

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

export default EditBCPForm;
