import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useResourcesRequired } from "../../../../hooks/documents/bcp/useResourcesRequired";
import { errorAlert, successAlert } from "../../../../utilities/alert";

const CreateResourcesRequired = () => {
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    rto: "",
    justification: "",
    rpo: "",
    manualWorkaround: "",
    operationalDuration: "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  const { addResourceRequired } = useResourcesRequired();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await addResourceRequired(formData);
      successAlert(
        "Record Added",
        `Resource Required "${formData.name}" added successfully!`
      );
      navigate("/Business-Continuity-Plan/resources-required");
    } catch (error) {
      errorAlert("Error", error.message || "Error adding Resource Required");
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

  return (
    <div className="flex flex-col w-full h-full">
      <h1 className="text-2xl font-bold text-green-500">
        Add New Resource Required
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
              <label className="font-semibold">Quantity</label>
              <input
                type="text"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="Enter Quantity"
                className="p-2 w-full rounded"
              />
            </div>
          </div>

          <div className="flex justify-between gap-10">
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
            <div className="flex flex-col gap-2 w-full">
              <label className="font-semibold">Justification</label>
              <input
                type="text"
                name="justification"
                value={formData.justification}
                onChange={handleChange}
                placeholder="Enter Justification"
                className="p-2 w-full rounded"
              />
            </div>
          </div>

          <div className="flex justify-between gap-10">
            <div className="flex flex-col gap-2 w-full">
              <label className="font-semibold">RPO</label>
              <input
                type="text"
                name="rpo"
                value={formData.rpo}
                onChange={handleChange}
                placeholder="Enter RPO"
                className="p-2 w-full rounded"
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label className="font-semibold">Manual Workaround</label>
              <input
                type="text"
                name="manualWorkaround"
                value={formData.manualWorkaround}
                onChange={handleChange}
                placeholder="Enter Manual Workaround"
                className="p-2 w-full rounded"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold">Operational Duration</label>
            <input
              type="text"
              name="operationalDuration"
              value={formData.operationalDuration}
              onChange={handleChange}
              placeholder="Enter Operational Duration"
              className="p-2 w-full rounded"
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
              to="/Business-Continuity-Plan/resources-required"
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

export default CreateResourcesRequired;
