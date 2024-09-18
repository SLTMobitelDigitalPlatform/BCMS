import { useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useResourcesRequired } from "../../../../hooks/documents/bcp/useResourcesRequired";

const ResourcesRequired = () => {
  const {
    resourcesRequired,
    loading,
    error,
    fetchResourcesRequired,
    deleteResourceRequired,
  } = useResourcesRequired();

  useEffect(() => {
    fetchResourcesRequired();
  }, []);

  const deleteResReq = async (id) => {
    try {
      await deleteResourceRequired(id);
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
          Resources Required
        </h1>
        <Link
          to="/createResourcesRequired"
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
                      to={`/editResourcesRequired/${resourcesRequired._id}`}
                      className="doc-edit-btn"
                    >
                      Edit
                    </Link>
                    <button
                      className="doc-delete-btn"
                      onClick={() => deleteResReq(resourcesRequired._id)}
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
