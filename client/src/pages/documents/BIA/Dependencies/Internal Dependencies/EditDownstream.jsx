import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { updateAlert } from "../../../../../utilities/alert";
import { useDownstream } from "../../../../../hooks/documents/bia/useDownstream";

const EditDownstream = () => {
  const location = useLocation();
  const { cbfid } = location.state || {};
  const cbfidValue = cbfid ? cbfid.value : "";
  const { biaid, id } = useParams();
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();
  const path = `/Business-Impact-Analysis/dependencies/${biaid}`;

  const [formData, setFormData] = useState({
    criticalBusinessFunction: "" ,
    section: "",
    primaryContact: "",
    secondaryContact: "",
    justification: "",
  });

  const {
    singleDocument: downstream,
    isLoading: loading,
    fetchDownstreamByIds,
    updateDownstream,
  } = useDownstream(biaid, cbfid.value, id);

  useEffect(() => {
    fetchDownstreamByIds(biaid, id);
  }, [biaid]);

  useEffect(() => {
    if (downstream) {
      setFormData({
        criticalBusinessFunction: downstream.criticalBusinessFunction || "",
        section: downstream.section || "",
        primaryContact: downstream.primaryContact || "",
        secondaryContact: downstream.secondaryContact || "",
        justification: downstream.justification || "",
      });
    }
  }, [downstream]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const downstreamData = {
        ...formData,
        biaid,
        criticalBusinessFunction: cbfid.value,
      };

      const result = await updateAlert(
        "Confirm Update",
        `Are you sure you want to update Downstream?`,
        "Yes, Update it!",
        `Downstream has been updated successfully!`,
        `Failed to update Downstream!`,
        () => updateDownstream(downstreamData)
      );

      if (result === "success") {
        navigate(path, {
          state: { activeStream: "downstream", cbfid: cbfid },
        });
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

  if (loading)
    return (
      <div className="flex justify-center items-center h-full">
        <FaSpinner className="animate-spin text-4xl text-green-500" />
      </div>
    );

  return (
    <div className="flex flex-col w-full h-full">
      <h1 className="text-2xl font-bold text-green-500">Edit Downstream</h1>
      <div className="bg-indigo-200 h-full mt-5 rounded-2xl p-8 overflow-auto">
        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold">Name of the Organization</label>
            <input
              type="text"
              name="section"
              value={formData.section}
              onChange={handleChange}
              placeholder="Enter Name of the Organization"
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
                "Create"
              )}
            </button>
            <Link
              to={path}
              state={{ activeStream: "downstream", cbfid: cbfid }}
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

export default EditDownstream;
