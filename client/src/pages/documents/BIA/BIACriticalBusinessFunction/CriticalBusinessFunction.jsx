import { useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useCriticalBusinessFunction } from "../../../../hooks/documents/bia/useCriticalBusinessFunction";
import { deleteAlert } from "../../../../utilities/alert";

const CriticalBusinessFunction = () => {
  const {
    criticalBusinessFunctions,
    loading,
    fetchCriticalBusinessFunctionsByBIAID,
    deleteCriticalBusinessFunction,
  } = useCriticalBusinessFunction();

  const { biaid } = useParams();

  useEffect(() => {
    fetchCriticalBusinessFunctionsByBIAID(biaid);
  }, [biaid]);

  const handleDelete = async (id, functionName) => {
    deleteAlert(
      "Are you sure?",
      `You are about to delete Critical Business Function "${functionName}". This action cannot be undone.`,
      "Yes, delete it!",
      `Critical Business Function "${functionName}" deleted successfully!`,
      `Error deleting Critical Business Function "${functionName}"`,
      () => deleteCriticalBusinessFunction(id, biaid)
    );
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
          Critical Business Functions
        </h1>
        <Link
          to={`/createBIACriticalBusinessFunction/${biaid}`}
          className="btn-primary"
        >
          Add Details
        </Link>
      </div>

      {/* Table */}
      <div className="h-full w-full overflow-auto">
        <table className="table-fixed w-full">
          <thead className="sticky top-0 bg-indigo-200">
            <tr>
              <th className="w-28 doc-table-head">Name</th>
              <th className="w-36 doc-table-head">Description</th>
              <th className="w-20 doc-table-head">Criticality</th>
              <th className="w-12 doc-table-head">RTO</th>
              <th className="w-12 doc-table-head">RPO</th>
              <th className="w-16 doc-table-head">Actions</th>
            </tr>
          </thead>
          <tbody>
            {criticalBusinessFunctions.map((biacbf) => (
              <tr key={biacbf._id} className="doc-table-hover">
                <td className="py-2 px-4 w-20 doc-table-data text-center">
                  {biacbf.functionName}
                </td>
                <td className="py-2 px-4 w-20 doc-table-data text-center">
                  {biacbf.description}
                </td>
                <td className="py-2 px-4 w-36 doc-table-data">
                  {biacbf.criticality}
                </td>
                <td className="py-2 px-4 w-36 doc-table-data">{biacbf.rto}</td>
                <td className="py-2 px-4 w-36 doc-table-data">{biacbf.rpo}</td>

                <td className="py-2 px-4 w-28 doc-table-data">
                  <div className="flex justify-center gap-2">
                    <Link
                      to={`/editBIACriticalBusinessFunction/${biaid}/${biacbf._id}`}
                      className="doc-edit-btn"
                    >
                      Edit
                    </Link>
                    <button
                      className="doc-delete-btn"
                      onClick={() => handleDelete(biacbf._id, biacbf.functionName)}
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
