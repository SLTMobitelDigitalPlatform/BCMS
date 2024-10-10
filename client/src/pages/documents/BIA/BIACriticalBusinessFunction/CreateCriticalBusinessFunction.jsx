import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCriticalBusinessFunction } from "../../../../hooks/documents/bia/useCriticalBusinessFunction";
import { createAlert } from "../../../../utilities/alert";

const CreateCriticalBusinessFunction = () => {
  const [formData, setFormData] = useState({
    functionName: "",
    description: "",
    criticality: "",
    rto: "",
    rpo: "",
  });

  const { biaid } = useParams();
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();
  const path = `/Business-Impact-Analysis/critical-business-function/${biaid}`;

  const { createDocument } = useCriticalBusinessFunction(biaid);

  const [formErrors, setFormErrors] = useState({});
  const validateForm = () => {
    const errors = {};
    if (!formData.functionName) errors.functionName = "Name is required";
    if (!formData.description) errors.description = "Description is required";
    if (!formData.criticality) errors.criticality = "Criticality is required";
    if (!formData.rto) errors.rto = "RTO is required";
    if (!formData.rpo) errors.rpo = "RPO is required";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setIsCreating(true);
      try {  
        const criticalBusinessFunctionData = { ...formData, biaid };
        createDocument(criticalBusinessFunctionData);
        createAlert(
          "Critical Business Function Added",
          `Critical Business Function "${formData.functionName}" added successfully!`
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
        Add New Critical Business Function
      </h1>
      <div className="bg-indigo-200 h-full mt-5 rounded-2xl p-8 overflow-auto">
        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold">Critical Business Function</label>
            <input
              type="text"
              name="functionName"
              value={formData.functionName}
              onChange={handleChange}
              placeholder="Enter Name"
              className="p-2 w-full rounded"
            />
            {formErrors.functionName && (
              <p className="text-red-500">{formErrors.functionName}</p>
            )}
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
            {formErrors.description && (
              <p className="text-red-500">{formErrors.description}</p>
            )}
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold">Criticality</label>
            <input
              type="text"
              name="criticality"
              value={formData.criticality}
              onChange={handleChange}
              placeholder="Enter Criticality"
              className="p-2 w-full rounded"
            />
            {formErrors.criticality && (
              <p className="text-red-500">{formErrors.criticality}</p>
            )}
          </div>
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
            {formErrors.rto && (
              <p className="text-red-500">{formErrors.rto}</p>
            )}
          </div>
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
            {formErrors.rpo && (
              <p className="text-red-500">{formErrors.rpo}</p>
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

export default CreateCriticalBusinessFunction;
