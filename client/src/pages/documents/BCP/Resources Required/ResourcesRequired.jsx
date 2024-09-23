import { useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useResourcesRequired } from "../../../../hooks/documents/bcp/useResourcesRequired";
import { deleteAlert } from "../../../../utilities/alert";

const ResourcesRequired = () => {
  const {
    resourcesRequired,
    loading,
    fetchResourcesRequiredByBCPID,
    deleteResourceRequired,
  } = useResourcesRequired();

  const { bcpid } = useParams();

  useEffect(() => {
    fetchResourcesRequiredByBCPID(bcpid);
  }, []);

  const handleDelete = async (id, name) => {
    deleteAlert(
      "Are you sure?",
      `You are about to delete Resource Required "${name}". This action cannot be undone.`,
      "Yes, delete it!",
      `Resource Reqired "${name}" deleted successfully!`,
      `Error deleting Resource Required "${name}"`,
      () => deleteResourceRequired(id, bcpid)
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
          Resources Required
        </h1>
        <Link
          to={`/createResourcesRequired/${bcpid}`}
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
              <th className="w-20 doc-table-border">Quantity</th>
              <th className="w-36 doc-table-border">RTO</th>
              <th className="w-36 doc-table-border">Justification</th>
              <th className="w-36 doc-table-border">RPO</th>
              <th className="w-36 doc-table-border">Manual Workaround</th>
              <th className="w-36 doc-table-border">Operational Duration</th>
              <th className="w-28 doc-table-border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {resourcesRequired.map((resourcesRequired) => (
              <tr key={resourcesRequired._id} className="hover:bg-indigo-100">
                <td className="py-2 px-4 w-20 doc-table-border text-center">
                  {resourcesRequired.name}
                </td>
                <td className="py-2 px-4 w-20 doc-table-border text-center">
                  {resourcesRequired.quantity}
                </td>
                <td className="py-2 px-4 w-36 doc-table-border">
                  {resourcesRequired.rto}
                </td>
                <td className="py-2 px-4 w-36 doc-table-border">
                  {resourcesRequired.justification}
                </td>
                <td className="py-2 px-4 w-36 doc-table-border">
                  {resourcesRequired.rpo}
                </td>
                <td className="py-2 px-4 w-36 doc-table-border">
                  {resourcesRequired.manualWorkaround}
                </td>
                <td className="py-2 px-4 w-36 doc-table-border">
                  {resourcesRequired.operationalDuration}
                </td>
                <td className="py-2 px-4 w-28 doc-table-border">
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
