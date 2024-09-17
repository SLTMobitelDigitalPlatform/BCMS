import { useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import { Link } from "react-router-dom";
import { usePreIncidentPreparation } from "../../../../hooks/documents/bcp/usePreIncidentPreparation";

const PreIncidentPreparation = () => {
  const {
    preIncidentPreparations,
    loading,
    error,
    fetchPreIncidentPreparation,
    deletePreIncidentPreparation,
  } = usePreIncidentPreparation();

  useEffect(() => {
    fetchPreIncidentPreparation();
  }, []);

  const deletePreIncidentPrep = async (id) => {
    try {
      await deletePreIncidentPreparation(id);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <FaSpinner className="animate-spin text-blue-500 text-3xl" />
      </div>
    );
  if (error) return <div>{error}</div>;

  return (
    <div className="px-5 pt-4 pb-16 w-full h-full overflow-hidden">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-xl font-bold text-indigo-900">
          Pre-Incident Preparation
        </h1>
        <Link
          to="/createPreIncidentPreparation"
          className="btn-primary font-semibold"
        >
          Add Details
        </Link>
      </div>

      {/* Table */}
      <div className="h-full w-full overflow-auto">
        <table className="table-fixed relative w-full py-10 bg-cyan-50">
          <thead className="sticky top-0 bg-indigo-800 text-white doc-table-border">
            <tr>
              <th className="w-20 doc-table-border">Pre-Incident Measures</th>
              <th className="w-20 doc-table-border">Frequency / Schedule</th>
              <th className="w-36 doc-table-border">
                Frequency / Schedule Responsibility
              </th>

              <th className="w-28 doc-table-border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {preIncidentPreparations.map((pip) => (
              <tr key={pip._id} className="hover:bg-indigo-100">
                <td className="py-2 px-4 w-20 doc-table-border text-center">
                  {pip.preIncidentMeasures}
                </td>
                <td className="py-2 px-4 w-20 doc-table-border text-center">
                  {pip.frequencyOrSchedule}
                </td>
                <td className="py-2 px-4 w-36 doc-table-border">
                  {pip.frequencyOrScheduleResponsibility}
                </td>

                <td className="py-2 px-4 w-28 doc-table-border">
                  <div className="flex justify-center gap-2">
                    <Link
                      to={`/editPreIncidentPreparation/${pip._id}`}
                      className="doc-edit-btn"
                    >
                      Edit
                    </Link>
                    <button
                      className="doc-delete-btn"
                      onClick={() => deletePreIncidentPrep(pip._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PreIncidentPreparation;
