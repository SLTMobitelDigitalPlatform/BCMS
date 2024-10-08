import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useBiaDocumentControl } from "../../../../hooks/documents/bia/useBiaDocumentControl";
import { updateAlert } from "../../../../utilities/alert";

const EditBiaDocumentControl = () => {
  const [formData, setFormData] = useState({
    version: "",
    description: "",
    date: "",
  });

  const { biaid, id } = useParams();
  console.log('biaid:', biaid, 'id:', id);
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();
  const path = `/Business-Impact-Analysis/document-control/${biaid}`;

  const {
    BiaDocumentControl,
    fetchBiaDocumentControlByIds,
    updateBiaDocumentControl,
  } = useBiaDocumentControl();

  useEffect(() => {
    console.log('Fetching document control data...');
    fetchBiaDocumentControlByIds(biaid, id).then((data) => {
      console.log('Document Control data:', data);
    }).catch((error) => {
      console.error('Error document control data:', error);
    });
  }, [biaid, id]);

  const [formErrors, setFormErrors] = useState({});
  const validateForm = () => {
    const errors = {};
      if (!formData.version) errors.version = "version is required";
      if (!formData.description) errors.description = "Description is required";
      if (!formData.date) errors.timeOfDay = "Date is required";
    return errors;
  };

  useEffect(() => {
    if (BiaDocumentControl) {
      console.log('BIA document control:', BiaDocumentControl);
      setFormData({
        version: BiaDocumentControl.version || "",
        description: BiaDocumentControl.description || "",
        date: BiaDocumentControl.date || "",

      });
      console.log('Form data:', formData);
    }
  }, [BiaDocumentControl]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setIsUpdating(true);
      try {
  
        const BiaDocumentControlData = { ...formData, biaid };
  
        const result = await updateAlert(
          "Confirm Update",
          `Are you sure you want to update "${BiaDocumentControl.version}"?`,
          "Yes, Update it!",
          `"${BiaDocumentControl.version}" has been updated successfully!`,
          `Failed to update "${BiaDocumentControl.version}"!`,
          () => updateBiaDocumentControl(id, BiaDocumentControlData)
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
        Update Document Control
      </h1>
      <div className="bg-indigo-200 h-full mt-5 rounded-2xl p-8 overflow-auto">
        <form onSubmit={handleSubmit} className="space-y-10">
                    
          {/* Version */}
          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold">Version</label>
            <input
              type="text"
              name="version"
              value={formData.version}
              onChange={handleChange}
              placeholder="Enter Version"
              className={`p-2 w-full rounded ${formErrors.version ? 'border-red-500' : ''}`}
            />
            {formErrors.version && (
              <p className="text-red-500">{formErrors.version}</p>
            )}
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold">Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter Description"
              className={`p-2 w-full rounded ${formErrors.description ? 'border-red-500' : ''}`}
            />
            {formErrors.description && (
              <p className="text-red-500">{formErrors.description}</p>
            )}
          </div>

          {/* Date */}
          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold">Date</label>
            <input
              type="text"
              name="date"
              value={formData.timeOfDay}
              onChange={handleChange}
              placeholder="Enter Date"
              className={`p-2 w-full rounded ${formErrors.date ? 'border-red-500' : ''}`}
            />
            {formErrors.timeOfDay && (
              <p className="text-red-500">{formErrors.date}</p>
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

export default EditBiaDocumentControl;
