import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useWorkAreaRecovery } from "../../../../hooks/documents/bcp/useWorkAreaRecovery";
import { updateAlert } from "../../../../utilities/alert";

const EditWorkAreaRecovery = () => {
  const [formData, setFormData] = useState({
    site: "",
    availableFrom: "",
    availableTo: "",
    travelDistance: "",
    travelTime: "",
    contactNumber: "",
  });

  const { bcpid, id } = useParams();
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();
  const path = `/Business-Continuity-Plan/work-area-recovery/${bcpid}`;

  const {
    workAreaRecovery,
    loading,
    fetchWorkAreaRecoveryByIds,
    updateWorkAreaRecovery,
  } = useWorkAreaRecovery();

  useEffect(() => {
    fetchWorkAreaRecoveryByIds(bcpid, id);
  }, []);

  useEffect(() => {
    if (workAreaRecovery) {
      setFormData({
        site: workAreaRecovery.site || "",
        availableFrom: workAreaRecovery.availableFrom || "",
        availableTo: workAreaRecovery.availableTo || "",
        travelDistance: workAreaRecovery.travelDistance || "",
        travelTime: workAreaRecovery.travelTime || "",
        contactNumber: workAreaRecovery.contactNumber || "",
      });
    }
  }, [workAreaRecovery]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      // ! Add duplicate id validation

      const workAreaRecoveryData = { ...formData, bcpid };

      const result = await updateAlert(
        "Confirm Update",
        `Are you sure you want to update "${workAreaRecovery.site}"?`,
        "Yes, Update it!",
        `"${workAreaRecovery.site}" has been updated successfully!`,
        `Failed to update "${workAreaRecovery.site}"!`,
        () => updateWorkAreaRecovery(id, workAreaRecoveryData)
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
        Add New Work Area Recovery
      </h1>
      <div className="bg-indigo-200 h-full mt-5 rounded-2xl p-8 overflow-auto">
        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="flex justify-between gap-10">
            <div className="flex flex-col gap-2 w-full">
              <label className="font-semibold">Site</label>
              <input
                type="text"
                name="site"
                value={formData.site}
                onChange={handleChange}
                placeholder="Enter Site"
                className="p-2 w-full rounded"
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label className="font-semibold">Contact Number</label>
              <input
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                placeholder="Enter Contact Number"
                className="p-2 w-full rounded"
              />
            </div>
          </div>

          <div className="flex justify-between gap-10">
            <div className="flex flex-col gap-2 w-full">
              <label className="font-semibold">Available From</label>
              <input
                type="text"
                name="availableFrom"
                value={formData.availableFrom}
                onChange={handleChange}
                placeholder="Enter Time Available From"
                className="p-2 w-full rounded"
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label className="font-semibold">Available To</label>
              <input
                type="text"
                name="availableTo"
                value={formData.availableTo}
                onChange={handleChange}
                placeholder="Enter Time Available To"
                className="p-2 w-full rounded"
              />
            </div>
          </div>

          <div className="flex justify-between gap-10">
            <div className="flex flex-col gap-2 w-full">
              <label className="font-semibold">Travel Distance</label>
              <input
                type="text"
                name="travelDistance"
                value={formData.travelDistance}
                onChange={handleChange}
                placeholder="Enter Time Travel Distance"
                className="p-2 w-full rounded"
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label className="font-semibold">Travel Time</label>
              <input
                type="text"
                name="travelTime"
                value={formData.travelTime}
                onChange={handleChange}
                placeholder="Enter Time Travel Time"
                className="p-2 w-full rounded"
              />
            </div>
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

export default EditWorkAreaRecovery;
