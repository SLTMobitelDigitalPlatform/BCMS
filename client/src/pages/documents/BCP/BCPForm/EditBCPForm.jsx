import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { useBCPForm } from "../../../../hooks/documents/bcp/useBCPForm";
import { useSections } from "../../../../hooks/useSections";
import { useUsers } from "../../../../hooks/useUsers";
import { errorAlert, successAlert } from "../../../../utilities/alert";

const EditBCPForm = () => {
  const [formData, setFormData] = useState({
    bcpid: "",
    date: "",
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

  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);

  const [isSaving, setIsSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

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
    fetchBCPFormById,
    updateBCPForm,
  } = useBCPForm();

  useEffect(() => {
    fetchUsers();
    fetchSections();
    fetchBCPFormById(id);
  }, []);

  useEffect(() => {
    createBCPID();
  }, [selectedYear, selectedSection]);

  // Create BCPID
  const createBCPID = async () => {
    const currentYear = selectedYear;
    setFormData({
      ...formData,
      bcpid: `BCP-${selectedSection}-${currentYear}`,
    });
  };

  // Update formData when embeddedDocument is fetched
  useEffect(() => {
    if (businessContinuityPlan) {
      setFormData({
        bcpid: businessContinuityPlan.bcpid || "",
        date: businessContinuityPlan.date || "",
        template: businessContinuityPlan.template || "",
        legalEntity: businessContinuityPlan.legalEntity || "",
        approver: businessContinuityPlan.approver || "",
        owner: businessContinuityPlan.owner || "",
        maintainer: businessContinuityPlan.maintainer || "",
        viewers: businessContinuityPlan.viewers || "",
        dateApproved: businessContinuityPlan.dateApproved || "",
        dateLastReviewed: businessContinuityPlan.dateLastReviewed || "",
        dateDueForNextReview: businessContinuityPlan.dateDueForNextReview || "",
      });
    }
  }, [businessContinuityPlan]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateBCPForm(id, formData);
      successAlert(
        "Record Updated",
        "Business Continuity Plan Updated Successfully!"
      );
      navigate("/Business-Continuity-Plan/bcp-form");
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
        ? selectedOptions.map((option) => option.value).join(", ")
        : "";

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

  const handleYearChange = (option) => {
    if (option) {
      setSelectedYear(option.value);
    } else {
      setSelectedYear(null);
    }
    createBCPID();
  };

  const handleSectionChange = (option) => {
    if (option) {
      setSelectedSection(option.value);
    } else {
      setSelectedSection(null);
    }
    createBCPID();
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
        Add New Business Continuity Plan
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
                  (section) => section.value === selectedSection
                )}
                onChange={handleSectionChange}
                isClearable={true}
                placeholder="Select Section"
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label className="font-semibold">Year</label>
              <Select
                options={years}
                value={years.find((year) => year.value === selectedYear)}
                onChange={handleYearChange}
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
                value={sortedUsers.find(
                  (user) => user.value === formData.viewers
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
