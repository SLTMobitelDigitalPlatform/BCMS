import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import Swal from "sweetalert2";
import { useBIAForm } from "../../../../hooks/documents/bia/useBIAForm";
import { useUsers } from "../../../../hooks/useUsers";

const EditBIAForm = () => {
  const [formData, setFormData] = useState({
    docNo: "",
    date: "",
    template: "",
    legalEntity: "",
    approver: "",
    owner: "",
    maintainers: [],
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
    businessImpactAnalysisPlan,
    loading: biaLoading,
    error: biaError,
    fetchBIAFormById,
    updateBIAForm,
  } = useBIAForm();

  useEffect(() => {
    fetchUsers();
    fetchBIAFormById(id);
  }, []);

  // Update formData when embeddedDocument is fetched
  useEffect(() => {
    if (businessImpactAnalysisPlan) {
      setFormData({
        docNo: businessImpactAnalysisPlan.docNo || "",
        date: businessImpactAnalysisPlan.date || "",
        template: businessImpactAnalysisPlan.template || "",
        legalEntity: businessImpactAnalysisPlan.legalEntity || "",
        approver: businessImpactAnalysisPlan.approver || "",
        owner: businessImpactAnalysisPlan.owner || "",
        maintainers: businessImpactAnalysisPlan.maintainers || [],
        viewers: businessImpactAnalysisPlan.viewers || [],
        dateApproved: businessImpactAnalysisPlan.dateApproved || "",
        dateLastReviewed: businessImpactAnalysisPlan.dateLastReviewed || "",
        dateDueForNextReview: businessImpactAnalysisPlan.dateDueForNextReview || "",
      });
    }
  }, [businessImpactAnalysisPlan]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateBIAForm(id, formData);
      handleSuccessAlert();
      navigate("/Business-Impact-Analysis/bia-form");
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

  // Updated handleChange with automatic "Date Due for Next Review" logic
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newFormData = { ...prev, [name]: value };

      // Automatically set the "Date Due for Next Review" one year after "Date Last Reviewed"
      if (name === "dateLastReviewed" && value) {
        const lastReviewedDate = new Date(value);
        const nextReviewDate = new Date(lastReviewedDate.setFullYear(lastReviewedDate.getFullYear() + 1));
        newFormData.dateDueForNextReview = nextReviewDate.toISOString().split("T")[0];
      }

      return newFormData;
    });
  };

  const handleSelectChange = (selectedOption, name) => {
    if (Array.isArray(selectedOption)) {
      setFormData({
        ...formData,
        [name]: selectedOption.map((option) => option.value),
      });
    } else {
      setFormData({
        ...formData,
        [name]: selectedOption ? selectedOption.value : "",
      });
    }
  };

  if (usersLoading || biaLoading) return <div>Loading...</div>;
  if (biaError || usersError) return <div>Error loading data.</div>;

  return (
    <div className="flex flex-col w-full h-full">
      <h1 className="text-2xl font-bold text-green-500">
        Update the Business Impact Analysis Plan
      </h1>
      <div className="bg-indigo-200 h-full mt-5 rounded-2xl p-8 overflow-auto">
        <form onSubmit={handleSubmit} className="space-y-10">

          {/* Document Number and Date */}
          <div className="flex justify-between gap-10">
            <div className="flex flex-col gap-2 w-1/2">
              <label className="font-semibold">Document Number</label>
              <input
                type="text"
                name="docNo"
                value={formData.docNo}
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
                disabled
                readOnly
                className="p-2 w-full rounded"
              />
            </div>
          </div>
 
          {/* Template and Legal Entity */}
          <div className="flex justify-between gap-10">
            <div className="flex flex-col gap-2 w-full">
              <label className="font-semibold">Template</label>
              <input
                type="text"
                name="template"
                value={formData.template}
                onChange={handleChange}
                placeholder="Enter the Template Number"
                className="p-2 w-full rounded"
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label className="font-semibold">Legal Entity</label>
              <input
                type="text"
                name="legalEntity"
                value={formData.legalEntity}
                onChange={handleChange}
                placeholder="Enter the Legal Entity"
                className="p-2 w-full rounded"
              />
            </div>
          </div>

          {/* Approver and Owner */}
          <div className="flex justify-between gap-10">
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
            <div className="flex flex-col gap-2 w-full">
              <label className="font-semibold">Owner</label>
              <Select
                options={sortedUsers}
                value={sortedUsers.find(
                  (user) => user.value === formData.owner
                )}
                onChange={(option) => handleSelectChange(option, "owner")}
                isClearable={true}
                placeholder="Select Owner"
              />
            </div>
          </div>

          {/* Maintainers */}
          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold">Maintainers</label>
            <Select
              isMulti
              options={sortedUsers}
              value={sortedUsers.filter(user => formData.maintainers?.includes(user.value))}
              onChange={(option) => handleSelectChange(option, "maintainers")}
              isClearable={true}
              placeholder="Select Maintainers"
            />
          </div>

          {/* Viewers */}
          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold">Viewers</label>
            <Select
              isMulti
              options={sortedUsers}
              value={sortedUsers.filter(user => formData.viewers?.includes(user.value))}
              onChange={(option) => handleSelectChange(option, "viewers")}
              isClearable={true}
              placeholder="Select Viewers"
            />
          </div>

          {/* Dates */}
          <div className="flex justify-between gap-10">
            <div className="flex flex-col gap-2 w-1/2">
              <label className="font-semibold">Date Approved</label>
              <input
                type="date"
                name="dateApproved"
                value={formData.dateApproved}
                disabled
                readOnly
                className="p-2 w-full rounded"
              />
            </div>
            <div className="flex flex-col gap-2 w-1/2">
              <label className="font-semibold">Date Last Reviewed</label>
              <input
                type="date"
                name="dateLastReviewed"
                value={formData.dateLastReviewed}
                disabled
                readOnly
                className="p-2 w-full rounded"
              />
            </div>
            <div className="flex flex-col gap-2 w-1/2">
              <label className="font-semibold">Date Due for Next Review</label>
              <input
                type="date"
                name="dateDueForNextReview"
                value={formData.dateDueForNextReview}
                disabled
                readOnly
                className="p-2 w-full rounded"
              />
            </div>
          </div>

          {/* Save and Cancel Buttons */}
          <div className="flex justify-start gap-2">
            <button
              type="submit"
              className="p-2 w-32 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold"
            >
              Save
            </button>
            <Link
              to="/Business-Impact-Analysis/bia-form"
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

export default EditBIAForm;
