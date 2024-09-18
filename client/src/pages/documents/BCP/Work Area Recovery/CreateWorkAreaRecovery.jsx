import { useState } from "react";
import { Link } from "react-router-dom";

const CreateWorkAreaRecovery = () => {
  const [formData, setFormData] = useState({
    site: "",
    availableFrom: "",
    availableTo: "",
    travelDistance: "",
    travelTime: "",
    contactNumber: "",
  });

  const handleSubmit = async (e) => {
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
              className="p-2 w-32 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold"
            >
              Save
            </button>
            <Link
              to="/Business-Continuity-Plan/work-area-recovery"
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

export default CreateWorkAreaRecovery;
