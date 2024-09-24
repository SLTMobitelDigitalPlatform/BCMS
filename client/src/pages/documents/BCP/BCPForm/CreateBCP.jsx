import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import { useBCPForm } from "../../../../hooks/documents/bcp/useBCPForm";
import { useSections } from "../../../../hooks/useSections";
import { useUsers } from "../../../../hooks/useUsers";
import { errorAlert, createAlert } from "../../../../utilities/alert";

const CreateBCP = () => {
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    bcpid: "",
    date: today,
    section: "",
    year: "",
    template: "",
    legalEntity: "",
    approver: "",
    owner: "",
    maintainer: "",
    viewers: [],
    dateApproved: "",
    dateLastReviewed: "",
    dateDueForNextReview: "",
  });

  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();

  // useHooks
  const {
    sortedUsers,
    loading: loadingUsers,
    error: errorUsers,
    fetchUsers,
  } = useUsers();

  const {
    loading: loadingBCPForms,
    error: errorBCPForms,
    fetchBCPForms,
    addBCPForm,
    checkDuplicateBCPID,
  } = useBCPForm();

  const {
    sortedSections,
    loading: loadingSections,
    error: errorSections,
    fetchSections,
  } = useSections();

  useEffect(() => {
    fetchUsers();
    fetchBCPForms();
    fetchSections();
  }, []);

  useEffect(() => {
    const newBCPID = `BCP-${formData.section}-${formData.year}`;
    setFormData((prevFormData) => ({
      ...prevFormData,
      bcpid: newBCPID,
    }));
  }, [formData.year, formData.section]);

  // Create new Business Continuity Plan
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsCreating(true);

    try {
      const isDuplicate = await checkDuplicateBCPID(formData.bcpid);

      if (isDuplicate) {
        errorAlert(
          "Error",
          `BCP ID "${formData.bcpid}" already exists! Please choose a different ID.`
        );
        setIsCreating(false);
        return;
      }

      await addBCPForm(formData);
      createAlert(
        "Business Continuity Plan Added",
        `Business Continuity Plan "${formData.bcpid}" added successfully!`
      );
      navigate("/business-continuity-plans");
    } catch (error) {
      errorAlert(
        "Error",
        error.message || "Error adding Business Continuity Plan!"
      );
      console.log(error);
    } finally {
      setIsCreating(false);
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

  if (loadingUsers || loadingSections || loadingBCPForms)
    return (
      <div className="flex items-center justify-center h-screen">
        <FaSpinner className="animate-spin text-blue-500 text-3xl" />
      </div>
    );
  if (errorUsers || errorSections || errorBCPForms)
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
                onChange={(option) => handleSelectChange(option, "section")}
                isClearable={true}
                placeholder="Select Section"
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label className="font-semibold">Year</label>
              <input
                type="text"
                name="year"
                value={formData.year}
                onChange={handleChange}
                placeholder="Enter Year"
                className="p-2 w-full rounded"
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
                isCreating ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isCreating}
            >
              {isCreating ? (
                <FaSpinner className="animate-spin inline text-xl " />
              ) : (
                "Create"
              )}
            </button>
            <Link
              to="/business-continuity-plans"
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
