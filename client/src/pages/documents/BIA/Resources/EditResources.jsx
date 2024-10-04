import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useResource } from "../../../../hooks/documents/bia/useResource";
import { updateAlert } from "../../../../utilities/alert";

const EditResources = () => {
  const [formData, setFormData] = useState({
    resourceName: "",
    quantity: "",  
    RTO: "",
    RPO: "",
  });

  const { biaid, id } = useParams();
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();
  const path = `/Business-Impact-Analysis/resources/${biaid}`;

  const {
    resource,
    fetchResourceByIds,
    updateResource,
  } = useResource();

  useEffect(() => {
    fetchResourceByIds(biaid, id);
  }, []);

  const [formErrors, setFormErrors] = useState({});
  const validateForm = () => {
    const errors = {};
      if (!formData.resourceName) errors.resourceName = "Name is required";
      if (!formData.quantity) errors.quantity = "Quantity is required";
      if (!formData.RTO) errors.RTO = "RTO is required";
      if (!formData.RPO) errors.RPO = "RPO is required";
    return errors;
  };

  useEffect(() => {
    if (resource) {
      setFormData({
        resourceName: resource.resourceName || "",
        quantity: resource.quantity || "",
        RTO: resource.RTO || "",
        RPO: resource.RPO || "",
      });
    }
  }, [resource]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setIsUpdating(true);
      try {
  
        const resourceData = { ...formData, biaid };
  
        const result = await updateAlert(
          "Confirm Update",
          `Are you sure you want to update "${resource.resourceName}"?`,
          "Yes, Update it!",
          `"${resource.resourceName}" has been updated successfully!`,
          `Failed to update "${resource.resourceName}"!`,
          () => updateResource(id, resourceData)
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
        Update Resources
      </h1>
      <div className="bg-indigo-200 h-full mt-5 rounded-2xl p-8 overflow-auto">
        <form onSubmit={handleSubmit} className="space-y-10">

          {/* Name */}
          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold">Name</label>
            <input
              type="text"
              name="resourceName"
              value={formData.resourceName}
              onChange={handleChange}
              placeholder="Enter Name"
              className={`p-2 w-full rounded ${formErrors.resourceName ? 'border-red-500' : ''}`}
            />
            {formErrors.resourceName && (
              <p className="text-red-500">{formErrors.resourceName}</p>
            )}
          </div>

          {/* Quantity */}
          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Enter Quantity"
              className={`p-2 w-full rounded ${formErrors.quantity ? 'border-red-500' : ''}`}
            />
            {formErrors.quantity && (
              <p className="text-red-500">{formErrors.quantity}</p>
            )}
          </div>

          {/* RTO */}
          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold">RTO</label>
            <input
              type="text"
              name="RTO"
              value={formData.RTO}
              onChange={handleChange}
              placeholder="Enter RTO"
              className={`p-2 w-full rounded ${formErrors.RTO ? 'border-red-500' : ''}`}
            />
            {formErrors.RTO && (
              <p className="text-red-500">{formErrors.RTO}</p>
            )}
          </div>

          {/* RPO */}
          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold">RPO</label>
            <input
              type="text"
              name="RPO"
              value={formData.RPO}
              onChange={handleChange}
              placeholder="Enter RPO"
              className={`p-2 w-full rounded ${formErrors.RPO ? 'border-red-500' : ''}`}
            />
            {formErrors.RPO && (
              <p className="text-red-500">{formErrors.RPO}</p>
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

export default EditResources;
