import { useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useResource } from "../../../../hooks/documents/bia/useResource";
import { deleteAlert } from "../../../../utilities/alert";

const resources = () => {
  const {
    resources,
    loading,
    fetchResourcesByBIAID,
    deleteResource,
  } = useResource();

  const { biaid } = useParams();

  useEffect(() => {
    fetchResourcesByBIAID(biaid);
  }, []);

  const handleDelete = async (id) => {
    deleteAlert(
      "Are you sure?",
      "You are about to delete Resource. This action cannot be undone.",
      "Yes, delete it!",
      "Resource deleted successfully!",
      "Error deleting Resource",
      () => deleteResource(id, biaid)
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
            Resources
        </h1>
        <Link to={`/createResources/${biaid}`} className="btn-primary">
          Add Details
        </Link>
      </div>

      {/* Table */}
      <div className="h-full w-full overflow-auto">
        <table className="table-fixed w-full">
          <thead className="sticky top-0 bg-indigo-200">
            <tr>
              <th className="w-20 doc-table-head">Name</th>
              <th className="w-12 doc-table-head">Quantity</th>
              <th className="w-12 doc-table-head">RTO</th>
              <th className="w-12 doc-table-head">RPO</th>
              <th className="w-12 doc-table-head">Actions</th>
            </tr>
          </thead>
          <tbody>
            {resources.map((resources) => (
              <tr key={resources._id} className="doc-table-hover">
                <td className="py-2 px-4 w-20 doc-table-data text-center">
                  {resources.resourceName}
                </td>
                <td className="py-2 px-4 w-20 doc-table-data text-center">
                  {resources.quantity}
                </td>
                <td className="py-2 px-4 w-36 doc-table-data">
                  {resources.RTO}
                </td>
                <td className="py-2 px-4 w-36 doc-table-data">
                  {resources.RPO}
                </td>
                <td className="py-2 px-4 w-28 doc-table-data">
                  <div className="flex justify-center gap-2">
                    <Link
                      to={`/editResources/${biaid}/${resources._id}`}
                      className="doc-edit-btn"
                    >
                      Edit
                    </Link>
                    <button
                      className="doc-delete-btn"
                      onClick={() => handleDelete(resources._id)}
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

export default resources;
