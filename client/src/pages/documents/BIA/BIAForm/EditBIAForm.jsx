import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { useBIAForm } from "../../../../hooks/documents/bia/useBIAForm";
import { useSections } from "../../../../hooks/useSections";
import { useUsers } from "../../../../hooks/useUsers";
import { errorAlert, updateAlert } from "../../../../utilities/alert";

const EditBIAForm = () => {
  const [formData, setFormData] = useState({
    biaid: "",
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

  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();
  const { biaid } = useParams();

  // useHooks
  const {
    user,
    sortedUsers,
    loading: usersLoading,
    error: usersError,
    fetchUsers,
  } = useUsers();

  const {
    sortedSections,
    loading: loadingSections,
    error: errorSections,
    fetchSections,
  } = useSections();

  const {
    businessImpactAnalysisPlan,
    loading: biaLoading,
    error: biaError,
    fetchBIAForms,
    fetchBIAFormByBIAID,
    updateBIAFormByBIAID,
  } = useBIAForm();

  useEffect(() => {
    fetchUsers();
    fetchSections();
    fetchBIAForms();
    fetchBIAFormByBIAID(biaid);
  }, []);

  useEffect(() => {
    if (businessImpactAnalysisPlan) {
      setFormData({
        biaid: businessImpactAnalysisPlan.biaid || "",
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

// Update a Bia Plan
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSaving(true);

  if (!formData.template || !formData.legalEntity || !formData.approver || !formData.owner) {
    errorAlert("Validation Error", "Please fill out all required fields.");
    setIsSaving(false);
    return;
  }

  try {
    const result = await updateAlert(
      "Confirm Update",
      `Are you sure you want to update "${businessImpactAnalysisPlan.biaid}"?`,
      "Yes, Update it!",
      `"${businessImpactAnalysisPlan.biaid}" has been updated successfully!`,
      `Failed to update "${businessImpactAnalysisPlan.biaid}"!`,
      () => updateBIAFormByBIAID(biaid, formData)
    );

    if (result === "success")
      navigate(`/Business-Impact-Analysis/bia-form/${formData.biaid}`);
  } catch (error) {
    errorAlert(
      "Error",
      error.message || "Error updating Business Impact Analysis Plan!"
    );
    console.log(error);
  } finally {
    setIsSaving(false);
  }
};

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

const handleSelectChange = (selectedOptions, name, isMulti = false) => {
  if (isMulti) {
    const selectedValues = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];

    setFormData({
      ...formData,
      [name]: selectedValues,
    });
  } else {
    setFormData({
      ...formData,
      [name]: selectedOptions ? selectedOptions.value : "",
    });
  }
};

if (usersLoading || loadingSections || biaLoading)
  return (
    <div className="flex items-center justify-center h-screen">
      <FaSpinner className="animate-spin text-blue-500 text-3xl" />
    </div>
  );
if (usersError || errorSections || biaError)
  return <div>Error loading data</div>;

  return (
    <div className="flex flex-col w-full h-full">
      <h1 className="text-2xl font-bold text-green-500">
        Edit Business Impact Analysis Plan - {businessImpactAnalysisPlan.biaid}
      </h1>
      <div className="bg-indigo-200 h-full mt-5 rounded-2xl p-8 overflow-auto">
        <form onSubmit={handleSubmit} className="space-y-10">

          {/* Document Number and Date */}
          <div className="flex justify-between gap-10">
            <div className="flex flex-col gap-2 w-1/2">
              <label className="font-semibold">Document Number</label>
              <input
                type="text"
                name="biaid"
                value={formData.biaid}
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
              value={sortedUsers.filter(user => formData.maintainers.includes(user.value))}
              onChange={(option) => handleSelectChange(option, "maintainers", true)}
              isClearable={true}
              placeholder="Select Maintainers"
            />
          </div>

          {/* Viewers */}
          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold">Viewers</label>
            <Select
              isMulti
              options={sortedSections}
              value={sortedSections.filter(section => formData.viewers.includes(section.value))}
              onChange={(option) => handleSelectChange(option, "viewers", true)}
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
              className={`p-2 w-32 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold ${
                isSaving ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isSaving}
            >
              {isSaving ? (
                <FaSpinner className="animate-spin inline text-xl " />
              ) : (
                "Save"
              )}
            </button>
            <Link
              to={`/Business-Impact-Analysis/bia-form/${biaid}`}
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
