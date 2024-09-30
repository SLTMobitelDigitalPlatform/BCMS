import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useOperatingSite } from "../../../../hooks/documents/bia/useOperatingSite";
import { createAlert } from "../../../../utilities/alert";

const CreateOperatingSites = () => {
  const [formData, setFormData] = useState({
    location: "",
    siteType: "",  
    address: "",
  });

  const { biaid } = useParams();
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();
  const path = `/Business-Impact-Analysis/operating-sites/${biaid}`;

  const { addOperatingSite } = useOperatingSite();

  const [formErrors, setFormErrors] = useState({});
  const validateForm = () => {
    const errors = {};
    if (!formData.location) errors.location = "Location is required";
    if (!formData.siteType) errors.siteType = "Site Type is required";
    if (!formData.address) errors.address = "Address is required";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setIsCreating(true);
      try {
        const operatingSiteData = { ...formData, biaid };
        await addOperatingSite(operatingSiteData);
        createAlert(
          "Operating Site Added",
          `Operating Site "${formData.location}" added successfully!`
        );
        navigate(path);
      } catch (error) {
        console.log(error);
      } finally {
        setIsCreating(false);
      }
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
        Add Operating Sites
      </h1>
      <div className="bg-indigo-200 h-full mt-5 rounded-2xl p-8 overflow-auto">
        <form onSubmit={handleSubmit} className="space-y-10">
                    
          {/* Location */}
          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter Location"
              className={`p-2 w-full rounded ${formErrors.location ? 'border-red-500' : ''}`}
            />
            {formErrors.location && (
              <p className="text-red-500">{formErrors.location}</p>
            )}
          </div>

          {/* Address */}
          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter Address"
              className={`p-2 w-full rounded ${formErrors.address ? 'border-red-500' : ''}`}
            />
            {formErrors.address && (
              <p className="text-red-500">{formErrors.address}</p>
            )}
          </div>

          {/* Site Type */}
          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold">Primary/Secondary</label>
            <select
              name="siteType"
              value={formData.siteType}
              onChange={handleChange}
              className={`p-2 w-full rounded ${formErrors.siteType ? 'border-red-500' : ''}`}
            >
              <option value="">Select Site Type</option>
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
            </select>
            {formErrors.siteType && (
              <p className="text-red-500">{formErrors.siteType}</p>
            )}
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

export default CreateOperatingSites;
