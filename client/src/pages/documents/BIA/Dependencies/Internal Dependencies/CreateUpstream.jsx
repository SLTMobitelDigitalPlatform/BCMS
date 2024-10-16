import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useUpstream } from "../../../../../hooks/documents/bia/useUpstream";
import { createAlert } from "../../../../../utilities/alert";

const CreateUpstream = () => {
  const location = useLocation();
  const { cbfid } = location.state || {};

  const [formData, setFormData] = useState({
    criticalBusinessFunction: cbfid ? cbfid.value : "",
    section: "",
    primaryContact: "",
    secondaryContact: "",
    justification: "",
  });

  const { biaid } = useParams();
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();
  const path = `/Business-Impact-Analysis/dependencies/${biaid}`;

  const { createUpstream } = useUpstream();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsCreating(true);
    try {
      const upstreamData = {
        ...formData,
        biaid,
        criticalBusinessFunction: cbfid.value,
      };
      await createUpstream(upstreamData);
      createAlert(
        "Upstream Added",
        `Upstream for ${cbfid.label} added successfully!`
      );
      navigate(path, {
        state: { activeStream: "upstream", cbfid: cbfid },
      });
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
      <h1 className="text-2xl font-bold text-green-500">Create Upstream</h1>
      <div className="bg-indigo-200 h-full mt-5 rounded-2xl p-8 overflow-auto">
        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold">Section/Business Unit</label>
            <input
              type="text"
              name="section"
              value={formData.section}
              onChange={handleChange}
              placeholder="Enter Name of the Section/Business Unit"
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
              state={{ activeStream: "upstream", cbfid: cbfid }}
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

export default CreateUpstream;
