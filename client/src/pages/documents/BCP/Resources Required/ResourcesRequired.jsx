import { FaSpinner } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useResourcesRequired } from "../../../../hooks/documents/bcp/useResourcesRequired";
import { deleteAlert } from "../../../../utilities/alert";

const ResourcesRequired = () => {
  const { bcpid } = useParams();

  const {
    allDocuments: resourcesRequired,
    isLoading: loading,
    deleteDocument,
  } = useResourcesRequired(bcpid);

  const handleDelete = (id, name) => {
    deleteAlert(
      "Are you sure?",
      `You are about to delete Resource Required "${name}". This action cannot be undone.`,
      "Yes, delete it!",
      `Resource Reqired "${name}" deleted successfully!`,
      `Error deleting Resource Required "${name}"`,
      () => deleteDocument(id)
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
          Resources Required
        </h1>
        <Link to={`/createResourcesRequired/${bcpid}`} className="btn-primary">
          Add Details
        </Link>
      </div>

      {/* Table */}
      <div className="h-full w-full overflow-auto">
        <table className="table-fixed w-full">
          <thead className="sticky top-0 bg-indigo-200">
            <tr>
              <th className="w-20 doc-table-head">Name</th>
              <th className="w-20 doc-table-head">Quantity</th>
              <th className="w-36 doc-table-head">RTO</th>
              <th className="w-36 doc-table-head">Justification</th>
              <th className="w-36 doc-table-head">RPO</th>
              <th className="w-36 doc-table-head">Manual Workaround</th>
              <th className="w-36 doc-table-head">Operational Duration</th>
              <th className="w-28 doc-table-head">Actions</th>
            </tr>
          </thead>
          <tbody>
            {resourcesRequired.map((resourcesRequired) => (
              <tr key={resourcesRequired._id} className="doc-table-hover">
                <td className="py-2 px-4 w-20 doc-table-data text-center">
                  {resourcesRequired.name}
                </td>
                <td className="py-2 px-4 w-20 doc-table-data text-center">
                  {resourcesRequired.quantity}
                </td>
                <td className="py-2 px-4 w-36 doc-table-data">
                  {resourcesRequired.rto}
                </td>
                <td className="py-2 px-4 w-36 doc-table-data">
                  {resourcesRequired.justification}
                </td>
                <td className="py-2 px-4 w-36 doc-table-data">
                  {resourcesRequired.rpo}
                </td>
                <td className="py-2 px-4 w-36 doc-table-data">
                  {resourcesRequired.manualWorkaround}
                </td>
                <td className="py-2 px-4 w-36 doc-table-data">
                  {resourcesRequired.operationalDuration}
                </td>
                <td className="py-2 px-4 w-28 doc-table-data">
                  <div className="flex justify-center gap-2">
                    <Link
                      to={`/editResourcesRequired/${bcpid}/${resourcesRequired._id}`}
                      className="doc-edit-btn"
                    >
                      Edit
                    </Link>
                    <button
                      className="doc-delete-btn"
                      onClick={() =>
                        handleDelete(
                          resourcesRequired._id,
                          resourcesRequired.name
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

export default ResourcesRequired;
