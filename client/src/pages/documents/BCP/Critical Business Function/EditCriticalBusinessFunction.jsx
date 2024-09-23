import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCriticalBusinessFunction } from "../../../../hooks/documents/bcp/useCriticalBusinessFunction";
import { updateAlert } from "../../../../utilities/alert";

const EditCriticalBusinessFunction = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    criticality: "",
    rto: "",
  });

  const { bcpid, id } = useParams();
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();
  const path = `/Business-Continuity-Plan/critical-business-function/${bcpid}`;

  const {
    criticalBusinessFunction,
    loading,
    fetchCriticalBusinessFunctionsByIds,
    updateCriticalBusinessFunction,
  } = useCriticalBusinessFunction();

  useEffect(() => {
    fetchCriticalBusinessFunctionsByIds(bcpid, id);
  }, []);

  useEffect(() => {
    if (criticalBusinessFunction) {
      setFormData({
        name: criticalBusinessFunction.name || "",
        description: criticalBusinessFunction.description || "",
        criticality: criticalBusinessFunction.criticality || "",
        rto: criticalBusinessFunction.rto || "",
      });
    }
  }, [criticalBusinessFunction]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const criticalBusinessFunctionData = { ...formData, bcpid };

      const result = await updateAlert(
        "Confirm Update",
        `Are you sure you want to update "${criticalBusinessFunction.name}"?`,
        "Yes, Update it!",
        `"${criticalBusinessFunction.name}" has been updated successfully!`,
        `Failed to update "${criticalBusinessFunction.name}"!`,
        () => updateCriticalBusinessFunction(id, criticalBusinessFunctionData)
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
        Edit Critical Business Function
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
            <label className="font-semibold">Criticality</label>
            <input
              type="text"
              name="criticality"
              value={formData.criticality}
              onChange={handleChange}
              placeholder="Enter Criticality"
              className="p-2 w-full rounded"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold">RTO</label>
            <input
              type="text"
              name="rto"
              value={formData.rto}
              onChange={handleChange}
              placeholder="Enter RTO"
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

export default EditCriticalBusinessFunction;
