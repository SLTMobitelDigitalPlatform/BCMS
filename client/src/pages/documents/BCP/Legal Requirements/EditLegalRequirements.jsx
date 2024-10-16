import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { useLegalRequirements } from "../../../../hooks/documents/bcp/useLegalRequirements";
import { useUsers } from "../../../../hooks/useUsers";
import { updateAlert } from "../../../../utilities/alert";

const EditLegalRequirements = () => {
  const [formData, setFormData] = useState({
    name: "",
    legalRequirement: "",
    monitoredBy: "",
  });

  const { bcpid, id } = useParams();
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();
  const path = `/Business-Continuity-Plan/legal-requirements/${bcpid}`;

  const { sortedUsers, loading: usersLoading, fetchUsers } = useUsers();

  const {
    singleDocument: legalRequirement,
    isLoading: legalRequirementLoading,

    updateDocument,
  } = useLegalRequirements(bcpid, id);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (legalRequirement) {
      setFormData({
        name: legalRequirement.name || "",
        legalRequirement: legalRequirement.legalRequirement || "",
        monitoredBy: legalRequirement.monitoredBy || "",
      });
    }
  }, [legalRequirement]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      // ! Add duplicate id validation false

      const legalRequirementData = { ...formData, bcpid };

      const result = await updateAlert(
        "Confirm Update",
        `Are you sure you want to update "${legalRequirement.name}"?`,
        "Yes, Update it!",
        `"${legalRequirement.name}" has been updated successfully!`,
        `Failed to update "${legalRequirement.name}"!`,
        () => updateDocument(legalRequirementData)
      );

      if (result === "success") {
        navigate(path);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsUpdating(false);
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

  if (usersLoading || legalRequirementLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <FaSpinner className="animate-spin text-4xl text-green-500" />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full">
      <h1 className="text-2xl font-bold text-green-500">
        Edit Legal Regulatory & Contractual Requirements
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
                isUpdating ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isUpdating}
            >
              {isUpdating ? (
                <FaSpinner className="animate-spin inline text-xl " />
              ) : (
                "Update"
              )}
            </button>
            <Link
              to={path}
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

export default EditLegalRequirements;
