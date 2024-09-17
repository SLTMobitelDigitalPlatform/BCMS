import { useState } from "react";
import { Link } from "react-router-dom";

const CreateRecoveryStrategy = () => {
  const [formData, setFormData] = useState({
    primaryOperatingSite: "",
    relocateTo: "",
    outsourceOptions: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Submit the form data to backend or API
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
        Add New Recovery Strategy
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
              className="p-2 w-32 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold"
            >
              Save
            </button>
            <Link
              to="/Business-Continuity-Plan/recovery-strategy"
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

export default CreateRecoveryStrategy;
