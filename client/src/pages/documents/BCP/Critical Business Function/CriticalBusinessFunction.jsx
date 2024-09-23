import { useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useCriticalBusinessFunction } from "../../../../hooks/documents/bcp/useCriticalBusinessFunction";
import { deleteAlert } from "../../../../utilities/alert";

const CriticalBusinessFunction = () => {
  const {
    criticalBusinessFunctions,
    loading,
    fetchCriticalBusinessFunctionsByBCPID,
    deleteCriticalBusinessFunction,
  } = useCriticalBusinessFunction();

  const { bcpid } = useParams();

  useEffect(() => {
    fetchCriticalBusinessFunctionsByBCPID(bcpid);
  }, [bcpid]);

  const handleDelete = async (id, name) => {
    deleteAlert(
      "Are you sure?",
      `You are about to delete Critical Business Function "${name}". This action cannot be undone.`,
      "Yes, delete it!",
      `Critical Business Function "${name}" deleted successfully!`,
      `Error deleting Critical Business Function "${name}"`,
      () => deleteCriticalBusinessFunction(id, bcpid)
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
        <h1 className="text-xl font-bold text-indigo-900">
          Critical Business Functions
        </h1>
        <Link
          to={`/createCriticalBusinessFunction/${bcpid}`}
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
              <th className="w-20 doc-table-border">Description</th>
              <th className="w-20 doc-table-border">Criticality</th>
              <th className="w-36 doc-table-border">RTO</th>
              <th className="w-28 doc-table-border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {criticalBusinessFunctions.map((cbf) => (
              <tr key={cbf._id} className="hover:bg-indigo-100">
                <td className="py-2 px-4 w-20 doc-table-border text-center">
                  {cbf.name}
                </td>
                <td className="py-2 px-4 w-20 doc-table-border text-center">
                  {cbf.description}
                </td>
                <td className="py-2 px-4 w-36 doc-table-border">
                  {cbf.criticality}
                </td>
                <td className="py-2 px-4 w-36 doc-table-border">{cbf.rto}</td>

                <td className="py-2 px-4 w-28 doc-table-border">
                  <div className="flex justify-center gap-2">
                    <Link
                      to={`/editCriticalBusinessFunction/${bcpid}/${cbf._id}`}
                      className="doc-edit-btn"
                    >
                      Edit
                    </Link>
                    <button
                      className="doc-delete-btn"
                      onClick={() => handleDelete(cbf._id, cbf.name)}
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

export default CriticalBusinessFunction;
