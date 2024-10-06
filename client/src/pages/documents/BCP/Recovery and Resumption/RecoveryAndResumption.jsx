import { useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useRecoveryAndResumptions } from "../../../../hooks/documents/bcp/useRecoveryAndResumption";
import { deleteAlert } from "../../../../utilities/alert";

const RecoveryResumption = () => {
  const {
    recoveryResumptions,
    loading,
    fetchRecoveryResumptionsByBCPID,
    deleteRecoveryResumption,
  } = useRecoveryAndResumptions();

  const { bcpid, cbfid } = useParams();
  console.log(bcpid, cbfid);

  useEffect(() => {
    fetchRecoveryResumptionsByBCPID(bcpid);
  }, []);

  const handleDelete = async (id) => {
    deleteAlert(
      "Are you sure?",
      `You are about to delete Recovery Resumption. This action cannot be undone.`,
      "Yes, delete it!",
      `Recovery Resumption deleted successfully!`,
      "Error deleting Recovery Resumption",
      () => deleteRecoveryResumption(id, bcpid)
    );
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <FaSpinner className="animate-spin text-blue-500 text-3xl" />
      </div>
    );

  return (
    <div className="h-full flex felx-col overflow-hidden">
      <div className="overflow-hidden h-screen rounded-2xl p-3">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-xl font-bold text-indigo-900">
            Recovery and Resumption
          </h1>
          <Link
            to={`/createRecoveryResumption/${bcpid}/${cbfid}`}
            className="btn-primary font-semibold"
          >
            Add Details
          </Link>
        </div>

        {/* Table */}
        <div className="overflow-auto">
          <table className="table-fixed relative w-full py-10 border bg-white border-indigo-800">
            <thead className="bg-indigo-200">
              <tr>
                <th className="w-20 doc-table-head">Description</th>
                <th className="w-20 doc-table-head">Timing of Item</th>
                <th className="w-36 doc-table-head">Duration Person</th>
                <th className="w-36 doc-table-head">Role</th>
                <th className="w-36 doc-table-head">
                  At Time Of Incident Actions
                </th>
                <th className="w-28 doc-table-head">
                  At Time Of Incident Comments
                </th>
              </tr>
            </thead>
            <tbody>
              {recoveryResumptions.map((recoveryResumption) => (
                <tr key={recoveryResumption._id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 w-20 doc-table-data text-center">
                    {recoveryResumption.description}
                  </td>
                  <td className="py-2 px-4 w-20 doc-table-data text-center">
                    {recoveryResumption.timing}
                  </td>
                  <td className="py-2 px-4 w-36 doc-table-data">
                    {recoveryResumption.role}
                  </td>
                  <td className="py-2 px-4 w-36 doc-table-data">
                    {recoveryResumption.timeOfIncidentActions}
                  </td>
                  <td className="py-2 px-4 w-36 doc-table-data">
                    {recoveryResumption.timeOfIncidentComments}
                  </td>
                  <td className="py-2 px-4 w-28 doc-table-data">
                    <div className="flex justify-center gap-2">
                      <Link
                        to={`/editRecoveryResumption/${bcpid}/${cbfid}/${recoveryResumption._id}`}
                        className="doc-edit-btn"
                      >
                        Edit
                      </Link>
                      <button
                        className="doc-delete-btn"
                        onClick={() => handleDelete(recoveryResumption._id)}
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
    </div>
  );
};

export default RecoveryResumption;
