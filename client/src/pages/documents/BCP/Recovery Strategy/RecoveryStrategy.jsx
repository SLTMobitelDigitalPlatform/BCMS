import { useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useRecoveryStrategy } from "../../../../hooks/documents/bcp/useRecoveryStrategy";
import { deleteAlert } from "../../../../utilities/alert";

const RecoveryStrategy = () => {
  const {
    recoveryStrategies,
    loading,
    fetchRecoveryStrategiesByBCPID,
    deleteRecoveryStrategy,
  } = useRecoveryStrategy();

  const { bcpid } = useParams();

  useEffect(() => {
    fetchRecoveryStrategiesByBCPID(bcpid);
  }, [bcpid]);

  const handleDelete = async (id) => {
    deleteAlert(
      "Are you sure?",
      "You are about to delete Recovery Strategy. This action cannot be undone.",
      "Yes, delete it!",
      "Recovery Strategy deleted successfully!",
      "Error deleting Recovery Strategy",
      () => deleteRecoveryStrategy(id, bcpid)
    );
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
        <h1 className="text-xl font-bold text-indigo-900">Recovery Strategy</h1>
        <Link
          to={`/createRecoveryStrategy/${bcpid}`}
          className="btn-primary font-semibold"
        >
          Add New Recovery Strategy
        </Link>
      </div>

      {/* Table */}
      <div className="h-full w-full overflow-auto">
        <table className="table-fixed relative w-full py-10 bg-cyan-50">
          <thead className="sticky top-0 bg-indigo-800 text-white doc-table-border">
            <tr>
              <th className="w-20 doc-table-border">Primary Operating Site</th>
              <th className="w-20 doc-table-border">
                Relocate to (Alternate Site)
              </th>
              <th className="w-36 doc-table-border">Outsource Options</th>

              <th className="w-28 doc-table-border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {recoveryStrategies.map((recoveryStrategy) => (
              <tr key={recoveryStrategy._id} className="hover:bg-indigo-100">
                <td className="py-2 px-4 w-20 doc-table-border text-center">
                  {recoveryStrategy.primaryOperatingSite}
                </td>
                <td className="py-2 px-4 w-20 doc-table-border text-center">
                  {recoveryStrategy.relocateTo}
                </td>
                <td className="py-2 px-4 w-36 doc-table-border">
                  {recoveryStrategy.outsourceOptions}
                </td>
                <td className="py-2 px-4 w-28 doc-table-border">
                  <div className="flex justify-center gap-2">
                    <Link
                      to={`/editRecoveryStrategy/${bcpid}/${recoveryStrategy._id}`}
                      className="doc-edit-btn"
                    >
                      Edit
                    </Link>
                    <button
                      className="doc-delete-btn"
                      onClick={() => handleDelete(recoveryStrategy._id)}
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

export default RecoveryStrategy;
