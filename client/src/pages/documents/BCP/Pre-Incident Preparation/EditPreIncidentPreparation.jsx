import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { usePreIncidentPreparation } from "../../../../hooks/documents/bcp/usePreIncidentPreparation";
import { updateAlert } from "../../../../utilities/alert";

const EditPreIncidentPreparation = () => {
  const [formData, setFormData] = useState({
    preIncidentMeasures: "",
    frequencyOrSchedule: "",
    frequencyOrScheduleResponsibility: "",
  });

  const { bcpid, id } = useParams();
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();
  const path = `/Business-Continuity-Plan/pre-incident-preparation/${bcpid}`;

  const {
    preIncidentPreparation,
    loading,
    fetchPreIncidentPreparationByIds,
    updatePreIncidentPreparation,
  } = usePreIncidentPreparation();

  useEffect(() => {
    fetchPreIncidentPreparationByIds(bcpid, id);
  }, []);

  useEffect(() => {
    if (preIncidentPreparation) {
      setFormData({
        preIncidentMeasures: preIncidentPreparation.preIncidentMeasures || "",
        frequencyOrSchedule: preIncidentPreparation.frequencyOrSchedule || "",
        frequencyOrScheduleResponsibility:
          preIncidentPreparation.frequencyOrScheduleResponsibility || "",
      });
    }
  }, [preIncidentPreparation]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      // ! Add duplicate id validation

      const preIncidentPreparationData = { ...formData, bcpid };

      const result = await updateAlert(
        "Confirm Update",
        `Are you sure you want to update "${preIncidentPreparation.preIncidentMeasures}"?`,
        "Yes, Update it!",
        `"${preIncidentPreparation.preIncidentMeasures}" has been updated successfully!`,
        `Failed to update "${preIncidentPreparation.preIncidentMeasures}"!`,
        () => updatePreIncidentPreparation(id, preIncidentPreparationData)
      );

      if (result === "success") {
        navigate(path);
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
      <div className="flex items-center justify-center h-screen">
        <FaSpinner className="animate-spin text-blue-500 text-3xl" />
      </div>
    );

  return (
    <div className="flex flex-col w-full h-full">
      <h1 className="text-2xl font-bold text-green-500">
        Edit Pre-Incident Preparation
      </h1>
      <div className="bg-indigo-200 h-full mt-5 rounded-2xl p-8 overflow-auto">
        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold">Pre-Incident Measures</label>
            <input
              type="text"
              name="preIncidentMeasures"
              value={formData.preIncidentMeasures}
              onChange={handleChange}
              placeholder="Enter Pre-Incident Measures"
              className="p-2 w-full rounded"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold">Frequency / Schedule</label>
            <input
              type="text"
              name="frequencyOrSchedule"
              value={formData.frequencyOrSchedule}
              onChange={handleChange}
              placeholder="Enter Frequency / Schedule"
              className="p-2 w-full rounded"
            />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold">
              Frequency / Schedule Responsibility
            </label>
            <input
              type="text"
              name="frequencyOrScheduleResponsibility"
              value={formData.frequencyOrScheduleResponsibility}
              onChange={handleChange}
              placeholder="Enter Frequency / Schedule Responsibility"
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

export default EditPreIncidentPreparation;
