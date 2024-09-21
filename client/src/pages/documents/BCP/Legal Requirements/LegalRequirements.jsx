import { useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useLegalRequirements } from "../../../../hooks/documents/bcp/useLegalRequirements";
import { deleteAlert } from "../../../../utilities/alert";

const LegalRequirements = () => {
  const {
    legalRequirements,
    loading,
    fetchLegalRequirementsByBCPID,
    deleteLegalRequirement,
  } = useLegalRequirements();

  const { bcpid } = useParams();

  useEffect(() => {
    fetchLegalRequirementsByBCPID(bcpid);
  }, []);

  const deleteLegReq = async (id) => {
    deleteAlert(
      "Are you sure?",
      "You are about to delete Legal, Regulatory and Contractual Requirement. This action cannot be undone.",
      "Yes, delete it!",
      "Legal, Regulatory and Contractual Requirement deleted successfully!",
      "Error deleting Legal, Regulatory and Contractual Requirement",
      () => deleteLegalRequirement(id, bcpid)
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
          Legal, Regulatory & Contractual Requirements
        </h1>
        <Link
          to={`/createLegalRequirements/${bcpid}`}
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
              <th className="w-20 doc-table-border">
                Name of the Organization
              </th>
              <th className="w-20 doc-table-border">
                Legal Regulatory & Contractual Requirements
              </th>
              <th className="w-36 doc-table-border">Monitored By</th>
              <th className="w-28 doc-table-border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {legalRequirements.map((legalReq) => (
              <tr key={legalReq._id} className="hover:bg-indigo-100">
                <td className="py-2 px-4 w-20 doc-table-border text-center">
                  {legalReq.name}
                </td>
                <td className="py-2 px-4 w-20 doc-table-border text-center">
                  {legalReq.legalRequirement}
                </td>
                <td className="py-2 px-4 w-36 doc-table-border">
                  {legalReq.monitoredBy}
                </td>
                <td className="py-2 px-4 w-28 doc-table-border">
                  <div className="flex justify-center gap-2">
                    <Link
                      to={`/editLegalRequirements/${bcpid}/${legalReq._id}`}
                      className="doc-edit-btn"
                    >
                      Edit
                    </Link>
                    <button
                      className="doc-delete-btn"
                      onClick={() => deleteLegReq(legalReq._id)}
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
