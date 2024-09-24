import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useVitalRecords } from "../../../../hooks/documents/bcp/useVitalRecords";
import { updateAlert } from "../../../../utilities/alert";

const EditVitalRecords = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    options: "",
    locations: "",
    thirdPartyContact: "",
    timeRequired: "",
    recordRecoveryPoint: "",
    recoveryStrategy: "",
  });

  const { bcpid, id } = useParams();
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();
  const path = `/Business-Continuity-Plan/vital-records/${bcpid}`;

  const {
    vitalRecord,
    loading: vitalRecordLoading,
    fetchVitalRecordByIds,
    updateVitalRecord,
  } = useVitalRecords();

  useEffect(() => {
    fetchVitalRecordByIds(bcpid, id);
  }, []);

  useEffect(() => {
    if (vitalRecord) {
      setFormData({
        name: vitalRecord.name || "",
        description: vitalRecord.description || "",
        options: vitalRecord.options || "",
        locations: vitalRecord.locations || "",
        thirdPartyContact: vitalRecord.thirdPartyContact || "",
        timeRequired: vitalRecord.timeRequired || "",
        recordRecoveryPoint: vitalRecord.recordRecoveryPoint || "",
        recoveryStrategy: vitalRecord.recoveryStrategy || "",
      });
    }
  }, [vitalRecord]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      // ! Add duplicate id validation

      const vitalRecordData = { ...formData, bcpid };

      const result = await updateAlert(
        "Confirm Update",
        `Are you sure you want to update "${vitalRecord.name}"?`,
        "Yes, Update it!",
        `"${vitalRecord.name}" has been updated successfully!`,
        `Failed to update "${vitalRecord.name}"!`,
        () => updateVitalRecord(id, vitalRecordData)
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

  if (vitalRecordLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <FaSpinner className="animate-spin text-4xl text-green-500" />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full">
      <h1 className="text-2xl font-bold text-green-500">
        Add New Vital Record
      </h1>
      <div className="bg-indigo-200 h-full mt-5 rounded-2xl p-8 overflow-auto">
        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="flex justify-between gap-10">
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
              <label className="font-semibold">Options</label>
              <input
                type="text"
                name="options"
                value={formData.options}
                onChange={handleChange}
                placeholder="Enter Options"
                className="p-2 w-full rounded"
              />
            </div>
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

          <div className="flex justify-between gap-10">
            <div className="flex flex-col gap-2 w-full">
              <label className="font-semibold">Locations</label>
              <input
                type="text"
                name="locations"
                value={formData.locations}
                onChange={handleChange}
                placeholder="Enter Locations"
                className="p-2 w-full rounded"
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label className="font-semibold">Third Party Contact</label>
              <input
                type="text"
                name="thirdPartyContact"
                value={formData.thirdPartyContact}
                onChange={handleChange}
                placeholder="Enter Third Party Contact"
                className="p-2 w-full rounded"
              />
            </div>
          </div>

          <div className="flex justify-between gap-10">
            <div className="flex flex-col gap-2 w-full">
              <label className="font-semibold">Time Required</label>
              <input
                type="text"
                name="timeRequired"
                value={formData.timeRequired}
                onChange={handleChange}
                placeholder="Enter Time Required"
                className="p-2 w-full rounded"
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label className="font-semibold">Record Recovery Point</label>
              <input
                type="text"
                name="recordRecoveryPoint"
                value={formData.recordRecoveryPoint}
                onChange={handleChange}
                placeholder="Enter Record Recovery Point"
                className="p-2 w-full rounded"
              />
            </div>
          </div>

          <div className="flex justify-between gap-10">
            <div className="flex flex-col gap-2 w-full">
              <label className="font-semibold">Recovery Strategy</label>
              <textarea
                type="text"
                rows={4}
                name="recoveryStrategy"
                value={formData.recoveryStrategy}
                onChange={handleChange}
                placeholder="Enter Recovery Strategy"
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

export default EditVitalRecords;
