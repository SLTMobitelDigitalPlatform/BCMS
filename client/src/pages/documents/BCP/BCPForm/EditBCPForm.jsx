import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { useBCPForm } from "../../../../hooks/documents/bcp/useBCPForm";
import { useSections } from "../../../../hooks/useSections";
import { useUsers } from "../../../../hooks/useUsers";
import { errorAlert, updateAlert } from "../../../../utilities/alert";

const EditBCPForm = () => {
  const [formData, setFormData] = useState({
    bcpid: "",
    date: "",
    section: "",
    year: "",
    template: "",
    legalEntity: "",
    approver: "",
    owner: "",
    maintainer: "",
    viewers: "",
    dateApproved: "",
    dateLastReviewed: "",
    dateDueForNextReview: "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();
  const { bcpid } = useParams();

  // useHooks
  const {
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
    businessContinuityPlan,
    loading: bcpLoading,
    error: bcpError,
    fetchBCPForms,
    fetchBCPFormByBCPID,
    updateBCPFormByBCPID,
    checkDuplicateBCPID,
  } = useBCPForm();

  useEffect(() => {
    fetchUsers();
    fetchSections();
    fetchBCPForms();
    fetchBCPFormByBCPID(bcpid);
  }, []);

  useEffect(() => {
    if (formData.section && formData.year) {
      const newBCPID = `BCP-${formData.section}-${formData.year}`;
      setFormData((prevFormData) => ({
        ...prevFormData,
        bcpid: newBCPID,
      }));
    }
  }, [formData.year, formData.section]);

  // Fill data in the input fields
  useEffect(() => {
    if (businessContinuityPlan) {
      setFormData({
        bcpid: businessContinuityPlan.bcpid || "",
        date: businessContinuityPlan.date || "",
        section: businessContinuityPlan.section || "",
        year: businessContinuityPlan.year || "",
        template: businessContinuityPlan.template || "",
        legalEntity: businessContinuityPlan.legalEntity || "",
        approver: businessContinuityPlan.approver || "",
        owner: businessContinuityPlan.owner || "",
        maintainer: businessContinuityPlan.maintainer || "",
        viewers: businessContinuityPlan.viewers || [],
        dateApproved: businessContinuityPlan.dateApproved || "",
        dateLastReviewed: businessContinuityPlan.dateLastReviewed || "",
        dateDueForNextReview: businessContinuityPlan.dateDueForNextReview || "",
      });
    }
  }, [businessContinuityPlan]);

  // Update a Business Continuity Plan
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const isDuplicate = await checkDuplicateBCPID(
        formData.bcpid,
        businessContinuityPlan.bcpid
      );

      if (isDuplicate) {
        errorAlert(
          "Error",
          `BCP ID "${formData.bcpid}" already exists! Please choose a different ID.`
        );
        setIsSaving(false);
        return;
      }

      const result = await updateAlert(
        "Confirm Update",
        `Are you sure you want to update "${businessContinuityPlan.bcpid}"?`,
        "Yes, Update it!",
        `"${businessContinuityPlan.bcpid}" has been updated successfully!`,
        `Failed to update "${businessContinuityPlan.bcpid}"!`,
        async () => {
          await updateBCPFormByBCPID(bcpid, formData);
        }
      );

      if (result === "success")
        navigate(`/Business-Continuity-Plan/bcp-form/${formData.bcpid}`);
    } catch (error) {
      errorAlert(
        "Error",
        error.message || "Error updating Business Continuity Plan!"
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

  const years = [
    { value: "2018", label: "2018" },
    { value: "2019", label: "2019" },
    { value: "2020", label: "2020" },
    { value: "2021", label: "2021" },
    { value: "2022", label: "2022" },
    { value: "2023", label: "2023" },
    { value: "2024", label: "2024" },
  ];

  if (usersLoading || loadingSections || bcpLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <FaSpinner className="animate-spin text-blue-500 text-3xl" />
      </div>
    );
  if (usersError || errorSections || bcpError)
    return <div>Error loading data</div>;

  return (
    <div className="flex flex-col w-full h-full">
      <h1 className="text-2xl font-bold text-green-500">
        Edit Business Continuity Plan - {businessContinuityPlan.bcpid}
      </h1>
      <div className="bg-indigo-200 h-full mt-5 rounded-2xl p-8 overflow-auto">
        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="flex justify-between gap-10">
            <div className="flex flex-col gap-2 w-1/2">
              <label className="font-semibold">BCP ID</label>
              <input
                type="text"
                name="bcpid"
                value={formData.bcpid}
                onChange={handleChange}
                disabled
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

          <div className="flex justify-between gap-10">
            <div className="flex flex-col gap-2 w-full">
              <label className="font-semibold">Sections</label>
              <Select
                options={sortedSections}
                value={sortedSections.find(
                  (section) => section.value === formData.section
                )}
                // onChange={handleSectionChange}
                onChange={(option) => handleSelectChange(option, "section")}
                isClearable={true}
                placeholder="Select Section"
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label className="font-semibold">Year</label>
              <Select
                options={years}
                value={years.find((year) => year.value === formData.year)}
                // onChange={handleYearChange}
                onChange={(option) => handleSelectChange(option, "year")}
                isClearable={true}
                placeholder="Select Year"
              />
            </div>
          </div>
          <div className="flex justify-between gap-10">
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
          </div>
          <div className="flex justify-between gap-10">
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
              <Select
                options={sortedUsers}
                value={sortedUsers.filter((user) =>
                  formData.viewers.includes(user.value)
                )}
                onChange={(option) =>
                  handleSelectChange(option, "viewers", true)
                }
                isClearable={true}
                isMulti={true}
                placeholder="Select Viewers"
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
              to={`/Business-Continuity-Plan/bcp-form/${bcpid}`}
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
