import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { useCriticalBusinessFunction } from "../../../../../hooks/documents/bcp/useCriticalBusinessFunction";
import { useExternalDependencies } from "../../../../../hooks/documents/bcp/useExternalDependencies";
import { updateAlert } from "../../../../../utilities/alert";

const EditExternalDependencies = () => {
  const [formData, setFormData] = useState({
    criticalBusinessFunction: "",
    organization: "",
    dependencies: "",
    primaryContact: "",
    secondaryContact: "",
    justification: "",
  });

  const { bcpid, id } = useParams();
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();
  const path = `/Business-Continuity-Plan/dependencies/${bcpid}`;

  const {
    singleDocument: externalDependency,
    isLoading: externalDependencyLoading,
    updateDocument,
  } = useExternalDependencies(bcpid, id);

  const { sortedCBFunctions, isLoading: criticalBusinessFunctionLoading } =
    useCriticalBusinessFunction(bcpid);

  useEffect(() => {
    if (externalDependency) {
      setFormData({
        criticalBusinessFunction:
          externalDependency.criticalBusinessFunction || "",
        organization: externalDependency.organization || "",
        dependencies: externalDependency.dependencies || "",
        primaryContact: externalDependency.primaryContact || "",
        secondaryContact: externalDependency.secondaryContact || "",
        justification: externalDependency.justification || "",
      });
    }
  }, [externalDependency]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      // ! Add duplicate id validation related

      const externalDependencyData = { ...formData, bcpid };

      const result = await updateAlert(
        "Confirm Update",
        `Are you sure you want to update "${externalDependency.referenceDocument}"?`,
        "Yes, Update it!",
        `"${externalDependency.referenceDocument}" has been updated successfully!`,
        `Failed to update "${externalDependency.referenceDocument}"!`,
        () => updateDocument(externalDependencyData)
      );

      if (result === "success") {
        navigate(path, { state: { activeTab: "externalDependencies" } });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsUpdating(false);
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

  if (criticalBusinessFunctionLoading || externalDependencyLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <FaSpinner className="animate-spin text-blue-500 text-3xl" />
      </div>
    );

  return (
    <div className="flex flex-col w-full h-full">
      <h1 className="text-2xl font-bold text-green-500">
        Edit External Dependency
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

export default EditExternalDependencies;
