import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRecoveryAndResumptions } from "../../../../hooks/documents/bcp/useRecoveryAndResumption";
import { updateAlert } from "../../../../utilities/alert";

const EditRecoveryResumption = () => {
  const [formData, setFormData] = useState({
    number: "",
    description: "",
    timing: "",
    duration: "",
    role: "",
    timeOfIncidentActions: "",
    timeOfIncidentComments: "",
  });

  const { bcpid, cbfid, id } = useParams();
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();
  const path = `/recovery-and-resumption/${bcpid}/${cbfid}`;

  const {
    recoveryResumption,
    loading,
    fetchRecoveryResumptionByIds,
    updateRecoveryResumption,
  } = useRecoveryAndResumptions();

  useEffect(() => {
    fetchRecoveryResumptionByIds(bcpid, cbfid, id);
  }, []);

  useEffect(() => {
    if (recoveryResumption) {
      setFormData({
        number: recoveryResumption.number || "",
        description: recoveryResumption.description || "",
        timing: recoveryResumption.timing || "",
        duration: recoveryResumption.duration || "",
        role: recoveryResumption.role || "",
        timeOfIncidentActions: recoveryResumption.timeOfIncidentActions || "",
        timeOfIncidentComments: recoveryResumption.timeOfIncidentComments || "",
      });
    }
  }, [recoveryResumption]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      // ! Add duplicate id validation

      const recoveryResumptionData = { ...formData, bcpid, cbfid };

      const result = await updateAlert(
        "Confirm Update",
        `Are you sure you want to update Recovery and Resumption "${recoveryResumption.number}"?`,
        "Yes, Update it!",
        `Recovery and Resumption "${recoveryResumption.number}" has been updated successfully!`,
        `Failed to update "${recoveryResumption.referenceDocument}"!`,
        () => updateRecoveryResumption(id, recoveryResumptionData)
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

  if (loading)
    return (
      <div className="flex justify-center items-center h-full">
        <FaSpinner className="animate-spin text-4xl text-green-500" />
      </div>
    );

  return (
    <div className="flex flex-col w-full h-full">
      <h1 className="text-2xl font-bold text-green-500">
        Edit Recovery and Resumption
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
                isUpdating ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isUpdating}
            >
              {isUpdating ? (
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

export default EditRecoveryResumption;
