import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRecoveryStrategy } from "../../../../hooks/documents/bcp/useRecoveryStrategy";
import { createAlert } from "../../../../utilities/alert";

const CreateRecoveryStrategy = () => {
  const [formData, setFormData] = useState({
    primaryOperatingSite: "",
    relocateTo: "",
    outsourceOptions: "",
  });

  const { bcpid } = useParams();
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();
  const path = `/Business-Continuity-Plan/recovery-strategy/${bcpid}`;

  const { createDocument } = useRecoveryStrategy(bcpid);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsCreating(true);
    try {
      // ! Add duplicate id validation
      const recoveryStrategyData = { ...formData, bcpid };
      createDocument(recoveryStrategyData);
      createAlert(
        "Recovery Strategy Added",
        `Recovery Strategy "${formData.primaryOperatingSite}" added successfully!`
      );
      navigate(path);
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

export default CreateRecoveryStrategy;
