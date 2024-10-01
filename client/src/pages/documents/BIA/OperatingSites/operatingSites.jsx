import { useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useOperatingSite } from "../../../../hooks/documents/bia/useOperatingSite";
import { deleteAlert } from "../../../../utilities/alert";

const operatingSites = () => {
  const {
    operatingSites,
    loading,
    fetchOperatingSitesByBIAID,
    deleteOperatingSite,
  } = useOperatingSite();

  const { biaid } = useParams();

  useEffect(() => {
    fetchOperatingSitesByBIAID(biaid);
  }, []);

  const handleDelete = async (id) => {
    deleteAlert(
      "Are you sure?",
      "You are about to delete Operating Site. This action cannot be undone.",
      "Yes, delete it!",
      "Operating Site deleted successfully!",
      "Error deleting Operating Site",
      () => deleteOperatingSite(id, biaid)
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
          Operating Sites
        </h1>
        <Link to={`/createOperatingSites/${biaid}`} className="btn-primary">
          Add Details
        </Link>
      </div>

      {/* Table */}
      <div className="h-full w-full overflow-auto">
        <table className="table-fixed w-full">
          <thead className="sticky top-0 bg-indigo-200">
            <tr>
              <th className="w-20 doc-table-head">Location</th>
              <th className="w-20 doc-table-head">Primary/Secondary</th>
              <th className="w-36 doc-table-head">Address</th>
              <th className="w-20 doc-table-head">Actions</th>
            </tr>
          </thead>
          <tbody>
            {operatingSites.map((sites) => (
              <tr key={sites._id} className="doc-table-hover">
                <td className="py-2 px-4 w-20 doc-table-data text-center">
                  {sites.location}
                </td>
                <td className="py-2 px-4 w-20 doc-table-data text-center">
                  {sites.siteType}
                </td>
                <td className="py-2 px-4 w-36 doc-table-data">
                  {sites.address}
                </td>
                <td className="py-2 px-4 w-28 doc-table-data">
                  <div className="flex justify-center gap-2">
                    <Link
                      to={`/editOperatingSites/${biaid}/${sites._id}`}
                      className="doc-edit-btn"
                    >
                      Edit
                    </Link>
                    <button
                      className="doc-delete-btn"
                      onClick={() => handleDelete(sites._id)}
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

export default operatingSites;
