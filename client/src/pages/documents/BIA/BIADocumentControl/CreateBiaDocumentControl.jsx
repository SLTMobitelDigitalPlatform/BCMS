import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useBiaDocumentControl } from "../../../../hooks/documents/bia/useBiaDocumentControl";
import { createAlert } from "../../../../utilities/alert";


const CreateBiaDocumentControl = () => {
  const [formData, setFormData] = useState({
    version: "",
    description: "",
    date: "",
  });

  const { biaid } = useParams();
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();
  const path = `/Business-Impact-Analysis/document-control/${biaid}`;

  const { addBiaDocumentControl } = useBiaDocumentControl();

  const [formErrors, setFormErrors] = useState({});
  const validateForm = () => {
    const errors = {};
      if (!formData.version) errors.version = "Version is required";
      if (!formData.description) errors.description = "Description is required";
      if (!formData.date) errors.date= "date is required";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setIsCreating(true);
      try {
        const BiaDocumentControlData = { ...formData, biaid };
        await addBiaDocumentControl(BiaDocumentControlData);
        createAlert(
          "Document version Added",
          `Document version "${formData.version}" added successfully!`
        );
        navigate(path);
      } catch (error) {
        console.log("Error adding peaks deadline:", error);
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
        Add document control
      </h1>
      <div className="bg-indigo-200 h-full mt-5 rounded-2xl p-8 overflow-auto">
        <form onSubmit={handleSubmit} className="space-y-10">
                    
          {/* version */}
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

          {/*  Date */}
          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold"> Date </label>
            <input
              type="text"
              name="date"
              value={formData.date}
              onChange={handleChange}
              placeholder="Enter Date"
              className={`p-2 w-full rounded ${formErrors.date ? 'border-red-500' : ''}`}
            />
            {formErrors.timeOfDay && (
              <p className="text-red-500">{formErrors.date}</p>
            )}
          </div>


           {/* Submit Button */}
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

export default CreateBiaDocumentControl ;
