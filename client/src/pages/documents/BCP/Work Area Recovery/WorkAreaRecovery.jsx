import { useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useWorkAreaRecovery } from "../../../../hooks/documents/bcp/useWorkAreaRecovery";
import { deleteAlert } from "../../../../utilities/alert";

const WorkAreaRecovery = () => {
  const {
    workAreaRecoveries,
    loading,
    fetchWorkAreaRecoveriesByBCPID,
    deleteWorkAreaRecovery,
  } = useWorkAreaRecovery();

  const { bcpid } = useParams();

  useEffect(() => {
    fetchWorkAreaRecoveriesByBCPID(bcpid);
  }, [bcpid]);

  const handleDelete = async (id, site) => {
    deleteAlert(
      "Are you sure?",
      `You are about to delete "${site}" Work Area Recovery. This action cannot be undone.`,
      "Yes, delete it!",
      `"${site}" Work Area Recovery deleted successfully!`,
      `Error deleting "${site}" Work Area Recovery`,
      () => deleteWorkAreaRecovery(id, bcpid)
    );
    // deleteAlert(
    //   "Are you sure?",
    //   "You are about to delete Work Area Recovery. This action cannot be undone.",
    //   "Yes, delete it!",
    //   "Work Area Recovery deleted successfully!",
    //   "Error deleting Work Area Recovery",
    //   () => deleteWorkAreaRecovery(id, bcpid)
    // );
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <FaSpinner className="animate-spin text-blue-500 text-3xl" />
      </div>
    );

  return (
    <div className="px-5 pt-4 pb-16 w-full h-full overflow-hidden">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-xl font-bold text-indigo-900">
          Work Area Recovery
        </h1>
        <Link
          to={`/createWorkAreaRecovery/${bcpid}`}
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
              <th className="w-20 doc-table-border">Site</th>
              <th className="w-20 doc-table-border">Available From</th>
              <th className="w-36 doc-table-border">Available To</th>
              <th className="w-36 doc-table-border">Travel Distance</th>
              <th className="w-36 doc-table-border">Travel Time</th>
              <th className="w-36 doc-table-border">Contact Number</th>
              <th className="w-28 doc-table-border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {workAreaRecoveries.map((workAreaRecovery) => (
              <tr key={workAreaRecovery._id} className="doc-table-hover">
                <td className="py-2 px-4 w-20 doc-table-border text-center">
                  {workAreaRecovery.site}
                </td>
                <td className="py-2 px-4 w-20 doc-table-border text-center">
                  {workAreaRecovery.availableFrom}
                </td>
                <td className="py-2 px-4 w-36 doc-table-border">
                  {workAreaRecovery.availableTo}
                </td>
                <td className="py-2 px-4 w-36 doc-table-border">
                  {workAreaRecovery.travelDistance}
                </td>
                <td className="py-2 px-4 w-36 doc-table-border">
                  {workAreaRecovery.travelTime}
                </td>
                <td className="py-2 px-4 w-36 doc-table-border">
                  {workAreaRecovery.contactNumber}
                </td>
                <td className="py-2 px-4 w-28 doc-table-border">
                  <div className="flex justify-center gap-2">
                    <Link
                      to={`/editWorkAreaRecovery/${bcpid}/${workAreaRecovery._id}`}
                      className="doc-edit-btn"
                    >
                      Edit
                    </Link>
                    <button
                      className="doc-delete-btn"
                      onClick={() =>
                        handleDelete(
                          workAreaRecovery._id,
                          workAreaRecovery.site
                        )
                      }
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

export default WorkAreaRecovery;
