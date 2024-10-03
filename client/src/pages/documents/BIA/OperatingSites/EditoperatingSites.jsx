import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useOperatingSite } from "../../../../hooks/documents/bia/useOperatingSite";
import { updateAlert } from "../../../../utilities/alert";

const EditOperatingSites = () => {
  const [formData, setFormData] = useState({
    location: "",
    siteType: "",  
    address: "",
  });

  const { biaid, id } = useParams();
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();
  const path = `/Business-Impact-Analysis/operating-sites/${biaid}`;

  const {
    operatingSite,
    fetchOperatingSiteByIds,
    updateOperatingSite,
  } = useOperatingSite();

  useEffect(() => {
    fetchOperatingSiteByIds(biaid, id);
  }, []);

  const [formErrors, setFormErrors] = useState({});
  const validateForm = () => {
    const errors = {};
    if (!formData.location) errors.location = "Location is required";
    if (!formData.siteType) errors.siteType = "Site Type is required";
    if (!formData.address) errors.address = "Address is required";
    return errors;
  };

  useEffect(() => {
    if (operatingSite) {
      setFormData({
        location: operatingSite.location || "",
        siteType: operatingSite.siteType || "",
        address: operatingSite.address || "",
      });
    }
  }, [operatingSite]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setIsUpdating(true);
      try {
  
        const operatingSiteData = { ...formData, biaid };
  
        const result = await updateAlert(
          "Confirm Update",
          `Are you sure you want to update "${operatingSite.location}"?`,
          "Yes, Update it!",
          `"${operatingSite.location}" has been updated successfully!`,
          `Failed to update "${operatingSite.location}"!`,
          () => updateOperatingSite(id, operatingSiteData)
        );
  
        if (result === "success") {
          navigate(path);
        }
      } catch (error) {
        console.log(error);
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
        Update Operating Sites
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

export default EditOperatingSites;
