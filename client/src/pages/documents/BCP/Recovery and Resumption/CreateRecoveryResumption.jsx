import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRecoveryAndResumptions } from "../../../../hooks/documents/bcp/useRecoveryAndResumption";
import { createAlert } from "../../../../utilities/alert";

const CreateRecoveryResumption = () => {
  const [formData, setFormData] = useState({
    number: "",
    description: "",
    timing: "",
    duration: "",
    role: "",
    timeOfIncidentActions: "",
    timeOfIncidentComments: "",
  });

  const { bcpid, cbfid } = useParams();
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();
  const path = `/recovery-and-resumption/${bcpid}/${cbfid}`;

  const {
    recoveryResumptions,
    loading,
    addRecoveryResumption,
    fetchRecoveryResumptionsByBCPID,
  } = useRecoveryAndResumptions();

  useEffect(() => {
    // Fetch recovery resumptions based on bcpid and cbfid
    fetchRecoveryResumptionsByBCPID(bcpid, cbfid);
  }, []);

  useEffect(() => {
    const newNumber = recoveryResumptions.length + 1;

    setFormData((prevData) => ({
      ...prevData,
      number: newNumber,
    }));
  }, [recoveryResumptions]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsCreating(true);
    try {
      // ! Add duplicate id validation

      const relatedDocumentData = {
        ...formData,
        bcpid,
        cbfid,
      };
      await addRecoveryResumption(relatedDocumentData);
      createAlert(
        "Recovery and Resumption Added",
        `Recovery and Resumption "${formData.number}" added successfully!`
      );
      navigate(path);
    } catch (error) {
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

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <FaSpinner className="animate-spin text-blue-500 text-3xl" />
      </div>
    );

  return (
    <div className="flex flex-col w-full h-full">
      <h1 className="text-2xl font-bold text-green-500">
        Add New Recovery and Resumption
      </h1>
      <div className="bg-indigo-200 h-full mt-5 rounded-2xl p-8 overflow-auto">
        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold">Number</label>
            <input
              type="text"
              name="number"
              value={formData.number}
              onChange={handleChange}
              className="p-2 w-full rounded"
              disabled
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold">Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter Description"
              className="p-2 w-full rounded"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold">Timing</label>
            <input
              type="text"
              name="timing"
              value={formData.timing}
              onChange={handleChange}
              placeholder="Enter Timing"
              className="p-2 w-full rounded"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold">Duration</label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="Enter Duration"
              className="p-2 w-full rounded"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold">Role</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="Enter Role"
              className="p-2 w-full rounded"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold">Time Of Incident Actions</label>
            <input
              type="text"
              name="timeOfIncidentActions"
              value={formData.timeOfIncidentActions}
              onChange={handleChange}
              placeholder="Enter Time Of Incident Actions"
              className="p-2 w-full rounded"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold">Time Of Incident Comments</label>
            <input
              type="text"
              name="timeOfIncidentComments"
              value={formData.timeOfIncidentComments}
              onChange={handleChange}
              placeholder="Enter Time Of Incident Comments"
              className="p-2 w-full rounded"
            />
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

export default CreateRecoveryResumption;
