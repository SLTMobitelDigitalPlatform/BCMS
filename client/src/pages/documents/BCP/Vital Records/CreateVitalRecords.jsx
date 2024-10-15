import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useVitalRecords } from "../../../../hooks/documents/bcp/useVitalRecords";
import { createAlert } from "../../../../utilities/alert";

const CreateVitalRecords = () => {
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

  const { bcpid } = useParams();
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();
  const path = `/Business-Continuity-Plan/vital-records/${bcpid}`;

  const { addVitalRecord } = useVitalRecords();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsCreating(true);
    try {
      // ! Add duplicate id validation

      const vitalRecordData = { ...formData, bcpid };
      await addVitalRecord(vitalRecordData);
      createAlert(
        "Vital Record Added",
        `Vital Record "${formData.name}" added successfully!`
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

export default CreateVitalRecords;
