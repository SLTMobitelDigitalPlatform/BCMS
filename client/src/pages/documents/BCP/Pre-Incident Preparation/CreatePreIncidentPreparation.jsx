import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { usePreIncidentPreparation } from "../../../../hooks/documents/bcp/usePreIncidentPreparation";
import { createAlert } from "../../../../utilities/alert";

const CreatePreIncidentPreparation = () => {
  const [formData, setFormData] = useState({
    preIncidentMeasures: "",
    frequencyOrSchedule: "",
    frequencyOrScheduleResponsibility: "",
  });

  const { bcpid } = useParams();

  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  const { addPreIncidentPreparation } = usePreIncidentPreparation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      // ! Add duplicate id validation

      const preIncidentPreparationData = {
        ...formData,
        bcpid,
      };

      await addPreIncidentPreparation(preIncidentPreparationData);
      createAlert(
        "Pre-Incident Preparation Added",
        `Pre-Incident Preparation "${formData.preIncidentMeasures}" added successfully!`
      );
      navigate(`/Business-Continuity-Plan/pre-incident-preparation/${bcpid}`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSaving(false);
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
        Add New Pre-Incident Preparation
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
                isSaving ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isSaving}
            >
              {isSaving ? (
                <FaSpinner className="animate-spin inline text-xl " />
              ) : (
                "Save"
              )}
            </button>
            <Link
              to={`/Business-Continuity-Plan/pre-incident-preparation/${bcpid}`}
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

export default CreatePreIncidentPreparation;
