import { useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useVitalRecords } from "../../../../hooks/documents/bcp/useVitalRecords";
import { deleteAlert } from "../../../../utilities/alert";

const VitalRecords = () => {
  const { vitalRecords, loading, fetchVitalRecordsByBCPID, deleteVitalRecord } =
    useVitalRecords();

  const { bcpid } = useParams();

  useEffect(() => {
    fetchVitalRecordsByBCPID(bcpid);
  }, []);

  const handleDelete = async (id, name) => {
    deleteAlert(
      "Are you sure?",
      `You are about to delete Vital Record "${name}". This action cannot be undone.`,
      "Yes, delete it!",
      `Vital Record "${name}" deleted successfully!`,
      `Error deleting Vital Record "${name}"`,
      () => deleteVitalRecord(id, bcpid)
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
        <h1 className="text-xl font-bold text-indigo-900">Vital Records</h1>
        <Link
          to={`/createVitalRecord/${bcpid}`}
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
              <th className="w-20 doc-table-border">Name</th>
              <th className="w-36 doc-table-border">Description</th>
              <th className="w-36 doc-table-border">Options</th>
              <th className="w-36 doc-table-border">Locations</th>
              <th className="w-36 doc-table-border">Third Party Contact</th>
              <th className="w-36 doc-table-border">Time Required</th>
              <th className="w-36 doc-table-border">Record Recovery Point</th>
              <th className="w-44 doc-table-border">
                If this record can be re-created, state how and from where
              </th>
              <th className="w-28 doc-table-border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vitalRecords.map((vitalRec) => (
              <tr key={vitalRec._id} className="hover:bg-indigo-100">
                <td className="py-2 px-4 w-20 doc-table-border text-center">
                  {vitalRec.name}
                </td>
                <td className="py-2 px-4 w-36 doc-table-border text-center">
                  {vitalRec.description}
                </td>
                <td className="py-2 px-4 w-36 doc-table-border">
                  {vitalRec.options}
                </td>
                <td className="py-2 px-4 w-36 doc-table-border">
                  {vitalRec.locations}
                </td>
                <td className="py-2 px-4 w-36 doc-table-border">
                  {vitalRec.thirdPartyContact}
                </td>
                <td className="py-2 px-4 w-36 doc-table-border">
                  {vitalRec.timeRequired}
                </td>
                <td className="py-2 px-4 w-36 doc-table-border">
                  {vitalRec.recordRecoveryPoint}
                </td>
                <td className="py-2 px-4 w-36 doc-table-border">
                  {vitalRec.recoveryStrategy}
                </td>
                <td className="py-2 px-4 w-28 doc-table-border">
                  <div className="flex justify-center gap-2">
                    <Link
                      to={`/editVitalRecords/${bcpid}/${vitalRec._id}`}
                      className="doc-edit-btn"
                    >
                      Edit
                    </Link>
                    <button
                      className="doc-delete-btn"
                      onClick={() => handleDelete(vitalRec._id, vitalRec.name)}
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

export default VitalRecords;
