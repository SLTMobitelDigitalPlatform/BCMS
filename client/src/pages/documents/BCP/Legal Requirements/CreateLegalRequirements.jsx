import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { useLegalRequirements } from "../../../../hooks/documents/bcp/useLegalRequirements";
import { useUsers } from "../../../../hooks/useUsers";
import { createAlert, errorAlert } from "../../../../utilities/alert";

const CreateLegalRequirements = () => {
  const [formData, setFormData] = useState({
    name: "",
    legalRequirement: "",
    monitoredBy: "",
  });

  const { bcpid } = useParams();

  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  const { sortedUsers, loading, error, fetchUsers } = useUsers();
  const { addLegalRequirement } = useLegalRequirements();

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      // ! Add duplicate id validation

      const legalRequirementData = { ...formData, bcpid };
      await addLegalRequirement(legalRequirementData);
      createAlert(
        "Legal Requirement Added",
        `Legal Requirement "${formData.name}" added successfully!`
      );
      navigate(`/Business-Continuity-Plan/legal-requirements/${bcpid}`);
    } catch (error) {
      errorAlert("Error", error.message || "Error adding Legal Requirement");
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
  const handleSelectChange = (selectedOption, name) => {
    setFormData({
      ...formData,
      [name]: selectedOption ? selectedOption.value : "",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <FaSpinner className="animate-spin text-4xl text-green-500" />
      </div>
    );
  }

  if (error) return <div>Error loading data.</div>;

  return (
    <div className="flex flex-col w-full h-full">
      <h1 className="text-2xl font-bold text-green-500">
        Add New Legal Regulatory & Contractual Requirements
      </h1>
      <div className="bg-indigo-200 h-full mt-5 rounded-2xl p-8 overflow-auto">
        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Name"
              className="p-2 w-full rounded"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold">
              Legal Regulatory & Contractual Requirements
            </label>
            <input
              type="text"
              name="legalRequirement"
              value={formData.legalRequirement}
              onChange={handleChange}
              placeholder="Enter Legal Regulatory & Contractual Requirements"
              className="p-2 w-full rounded"
            />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold">Monitored By</label>
            <Select
              options={sortedUsers}
              value={sortedUsers.find(
                (user) => user.value === formData.monitoredBy
              )}
              onChange={(option) => handleSelectChange(option, "monitoredBy")}
              isClearable={true}
              placeholder="Select Responsible Person"
            />
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
              to={`/Business-Continuity-Plan/legal-requirements/${bcpid}`}
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

export default CreateLegalRequirements;
