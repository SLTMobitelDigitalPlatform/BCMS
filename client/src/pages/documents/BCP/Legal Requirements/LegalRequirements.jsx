import { FaSpinner } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useLegalRequirements } from "../../../../hooks/documents/bcp/useLegalRequirements";
import { deleteAlert } from "../../../../utilities/alert";
import { useUsers } from "../../../../hooks/useUsers";
import { useEffect } from "react";

const LegalRequirements = () => {
  const { bcpid } = useParams();

  const {
    allDocuments: legalRequirements,
    isLoading: loading,
    deleteDocument,
  } = useLegalRequirements(bcpid);

  const { users, loading: usersLoading, fetchUsers } = useUsers();

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    deleteAlert(
      "Are you sure?",
      "You are about to delete Legal, Regulatory and Contractual Requirement. This action cannot be undone.",
      "Yes, delete it!",
      "Legal, Regulatory and Contractual Requirement deleted successfully!",
      "Error deleting Legal, Regulatory and Contractual Requirement",
      () => deleteDocument(id)
    );
  };

  const getUserName = (id) => {
    const user = users.find((user) => user._id === id);
    return user ? user.name : "Unknown User";
  };

  if (loading || usersLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <FaSpinner className="animate-spin text-blue-500 text-3xl" />
      </div>
    );

  return (
    <div className="pt-5 w-full h-full flex flex-col">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-xl font-bold text-indigo-900">
          Legal, Regulatory & Contractual Requirements
        </h1>
        <Link to={`/createLegalRequirements/${bcpid}`} className="btn-primary">
          Add Details
        </Link>
      </div>

      {/* Table */}
      <div className="h-full w-full overflow-auto">
        <table className="table-fixed w-full">
          <thead className="sticky top-0 bg-indigo-200">
            <tr>
              <th className="w-20 doc-table-head">Name of the Organization</th>
              <th className="w-20 doc-table-head">
                Legal Regulatory & Contractual Requirements
              </th>
              <th className="w-36 doc-table-head">Monitored By</th>
              <th className="w-28 doc-table-head">Actions</th>
            </tr>
          </thead>
          <tbody>
            {legalRequirements.map((legalReq) => (
              <tr key={legalReq._id} className="doc-table-hover">
                <td className="py-2 px-4 w-20 doc-table-data text-center">
                  {legalReq.name}
                </td>
                <td className="py-2 px-4 w-20 doc-table-data text-center">
                  {legalReq.legalRequirement}
                </td>
                <td className="py-2 px-4 w-36 doc-table-data">
                  {getUserName(legalReq.monitoredBy)}
                </td>
                <td className="py-2 px-4 w-28 doc-table-data">
                  <div className="flex justify-center gap-2">
                    <Link
                      to={`/editLegalRequirements/${bcpid}/${legalReq._id}`}
                      className="doc-edit-btn"
                    >
                      Edit
                    </Link>
                    <button
                      className="doc-delete-btn"
                      onClick={() => handleDelete(legalReq._id)}
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

export default LegalRequirements;
