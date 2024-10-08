import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { useCriticalBusinessFunction } from "../../../../../hooks/documents/bia/useCriticalBusinessFunction";
import { useExternalDependencies } from "../../../../../hooks/documents/bia/useExternalDependencies";
import { createAlert } from "../../../../../utilities/alert";

const CreateExternalDependencies = () => {
  const [formData, setFormData] = useState({
    criticalBusinessFunction: "",
    organization: "",
    dependencies: "",
    primaryContact: "",
    secondaryContact: "",
    justification: "",
  });

  const { biaid } = useParams();
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();
  const path = `/Business-Impact-Analysis/dependencies/${biaid}`;

  const { createExternalDependency } = useExternalDependencies();

  const { sortedCBFunctions, loading, fetchCriticalBusinessFunctionsByBIAID } =
    useCriticalBusinessFunction();

  useEffect(() => {
    fetchCriticalBusinessFunctionsByBIAID(biaid);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsCreating(true);
    try {
      const externalDependencyData = { ...formData, biaid };
      await createExternalDependency(externalDependencyData);
      createAlert(
        "External Dependency Added",
        `External Dependency added successfully!`
      );
      navigate(path, { state: { activeTab: "externalDependencies" } });
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

  const handleSelectChange = (selectedOption, name) => {
    setFormData({
      ...formData,
      [name]: selectedOption ? selectedOption.value : "",
    });
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <FaSpinner className="animate-spin text-blue-500 text-3xl" />
      </div>
    );

  return (
    <div className="flex flex-col w-full h-full">
      <h1 className="text-2xl font-bold text-green-500">
          Add New External Dependency
      </h1>
      <div className="bg-indigo-200 h-full mt-5 rounded-2xl p-8 overflow-auto">
        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold">Critical Business Function</label>
            <Select
              className="mx-1 mt-1 mb-5 w-1/3 font-semibold"
              value={sortedCBFunctions.find(
                (cbf) => cbf.value === formData.criticalBusinessFunction
              )}
              onChange={(option) =>
                handleSelectChange(option, "criticalBusinessFunction")
              }
              options={sortedCBFunctions}
              placeholder="Select Critical Business Function"
              isSearchable={false}
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold">Name of the Organization</label>
            <input
              type="text"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              placeholder="Enter Name of the Organization"
              className="p-2 w-full rounded"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold">Dependencies</label>
            <input
              type="text"
              name="dependencies"
              value={formData.dependencies}
              onChange={handleChange}
              placeholder="Enter Dependencies"
              className="p-2 w-full rounded"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold">Primary Contact</label>
            <input
              type="text"
              name="primaryContact"
              value={formData.primaryContact}
              onChange={handleChange}
              placeholder="Enter Primary Contact"
              className="p-2 w-full rounded"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold">Secondary Contact</label>
            <input
              type="text"
              name="secondaryContact"
              value={formData.secondaryContact}
              onChange={handleChange}
              placeholder="Enter Secondary Contact"
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
              state={{ activeTab: "externalDependencies" }}
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

export default CreateExternalDependencies;
