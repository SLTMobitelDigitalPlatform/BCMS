import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { usePreIncidentPreparation } from "../../../../hooks/documents/bcp/usePreIncidentPreparation";

const EditPreIncidentPreparation = () => {
  const [formData, setFormData] = useState({
    preIncidentMeasures: "",
    frequencyOrSchedule: "",
    frequencyOrScheduleResponsibility: "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    preIncidentPreparation,
    loading,
    error,
    fetchPreIncidentPreparationById,
    updatePreIncidentPreparation,
  } = usePreIncidentPreparation();

  useEffect(() => {
    fetchPreIncidentPreparationById(id);
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
    setIsSaving(true);
    try {
      await updatePreIncidentPreparation(id, formData);
      handleSuccessAlert();
      navigate("/Business-Continuity-Plan/pre-incident-preparation");
    } catch (error) {
      handleErrorAlert();
      console.log(error);
    } finally {
      setIsSaving(false);
    }
  };

  // Success Alert
  const handleSuccessAlert = () => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Record Updated Successfully",
      showConfirmButton: false,
      timer: 2000,
    });
  };

  // Error Alert
  const handleErrorAlert = () => {
    Swal.fire({
      title: "Something Went Wrong",
      text: "Fix it and try again",
      icon: "error",
    });
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
  if (error) return <div>{error}</div>;

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
              to="/Business-Continuity-Plan/pre-incident-preparation"
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
