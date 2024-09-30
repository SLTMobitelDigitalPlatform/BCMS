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
    <div className="pt-5 w-full h-full flex flex-col">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-xl font-bold text-indigo-900">
          Work Area Recovery
        </h1>
        <Link to={`/createWorkAreaRecovery/${bcpid}`} className="btn-primary">
          Add Details
        </Link>
      </div>

      {/* Table */}
      <div className="h-full w-full overflow-auto">
        <table className="table-fixed w-full">
          <thead className="sticky top-0 bg-indigo-200">
            <tr>
              <th className="w-20 doc-table-head">Site</th>
              <th className="w-20 doc-table-head">Available From</th>
              <th className="w-36 doc-table-head">Available To</th>
              <th className="w-36 doc-table-head">Travel Distance</th>
              <th className="w-36 doc-table-head">Travel Time</th>
              <th className="w-36 doc-table-head">Contact Number</th>
              <th className="w-28 doc-table-head">Actions</th>
            </tr>
          </thead>
          <tbody>
            {workAreaRecoveries.map((workAreaRecovery) => (
              <tr key={workAreaRecovery._id} className="doc-table-hover">
                <td className="py-2 px-4 w-20 doc-table-data text-center">
                  {workAreaRecovery.site}
                </td>
                <td className="py-2 px-4 w-20 doc-table-data text-center">
                  {workAreaRecovery.availableFrom}
                </td>
                <td className="py-2 px-4 w-36 doc-table-data">
                  {workAreaRecovery.availableTo}
                </td>
                <td className="py-2 px-4 w-36 doc-table-data">
                  {workAreaRecovery.travelDistance}
                </td>
                <td className="py-2 px-4 w-36 doc-table-data">
                  {workAreaRecovery.travelTime}
                </td>
                <td className="py-2 px-4 w-36 doc-table-data">
                  {workAreaRecovery.contactNumber}
                </td>
                <td className="py-2 px-4 w-28 doc-table-data">
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
