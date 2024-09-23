import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRecoveryStrategy } from "../../../../hooks/documents/bcp/useRecoveryStrategy";
import { updateAlert } from "../../../../utilities/alert";
const EditRecoveryStrategy = () => {
  const [formData, setFormData] = useState({
    primaryOperatingSite: "",
    relocateTo: "",
    outsourceOptions: "",
  });

  const { bcpid, id } = useParams();
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();
  const path = `/Business-Continuity-Plan/recovery-strategy/${bcpid}`;

  const {
    recoveryStrategy,
    loading,
    fetchRecoveryStrategyByIds,
    updateRecoveryStrategy,
  } = useRecoveryStrategy();

  useEffect(() => {
    fetchRecoveryStrategyByIds(bcpid, id);
  }, []);

  useEffect(() => {
    if (recoveryStrategy) {
      setFormData({
        primaryOperatingSite: recoveryStrategy.primaryOperatingSite,
        relocateTo: recoveryStrategy.relocateTo,
        outsourceOptions: recoveryStrategy.outsourceOptions,
      });
    }
  }, [recoveryStrategy]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      // ! Add duplicate id validation
      const recoveryStrategyData = { ...formData, bcpid };

      const result = await updateAlert(
        "Confirm Update",
        `Are you sure you want to update "${recoveryStrategy.primaryOperatingSite}"?`,
        "Yes, Update it!",
        `"${recoveryStrategy.primaryOperatingSite}" has been updated successfully!`,
        `Failed to update "${recoveryStrategy.primaryOperatingSite}"!`,
        () => updateRecoveryStrategy(id, recoveryStrategyData)
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
        Edit Recovery Strategy
      </h1>
      <div className="bg-indigo-200 h-full mt-5 rounded-2xl p-8 overflow-auto">
        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold">Primary Operating Site</label>
            <input
              type="text"
              name="primaryOperatingSite"
              value={formData.primaryOperatingSite}
              onChange={handleChange}
              placeholder="Enter Primary Operating Site"
              className="p-2 w-full rounded"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold">Relocate To</label>
            <input
              type="text"
              name="relocateTo"
              value={formData.relocateTo}
              onChange={handleChange}
              placeholder="Enter Relocate To"
              className="p-2 w-full rounded"
            />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold">Outsource Options</label>
            <input
              type="text"
              name="outsourceOptions"
              value={formData.outsourceOptions}
              onChange={handleChange}
              placeholder="Enter Outsource Options"
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

export default EditRecoveryStrategy;
