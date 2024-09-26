import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useBCPForm } from "../../../hooks/documents/bcp/useBCPForm";
import { deleteAlert } from "../../../utilities/alert";
import { FaSpinner } from "react-icons/fa";

const BusinessContinuityPlans = () => {
  const { businessContinuityPlans, loading, fetchBCPForms, deleteBCPForm } =
    useBCPForm();

  useEffect(() => {
    fetchBCPForms();
  }, []);

  const deleteBusinessContinuityPlan = async (id, bcpid) => {
    deleteAlert(
      "Are you sure?",
      `You are about to delete Business Continuity Plan "${bcpid}". This action cannot be undone.`,
      "Yes, delete it!",
      `Business Continuity Plan "${bcpid}" deleted successfully!`,
      `Error deleting Business Continuity Plan "${bcpid}"`,
      async () => await deleteBCPForm(id)
    );
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <FaSpinner className="animate-spin text-blue-500 text-3xl" />
      </div>
    );

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-3xl font-bold text-indigo-900">
          Business Continuity Plans
        </h1>
        <Link to="/createBCP" className="btn-primary">
          Create Plan
        </Link>
      </div>

      {/* Table */}
      <div className="h-full w-full overflow-auto">
        <table className="table-fixed w-full">
          <thead className="sticky top-0 bg-indigo-200">
            <tr>
              <th className="w-32 doc-table-head">BCP ID</th>
              <th className="w-44 doc-table-head">Legal Entity</th>
              <th className="w-44 doc-table-head">Approver</th>
              <th className="w-44 doc-table-head">Owner</th>
              <th className="w-44 doc-table-head">Maintainer</th>
              <th className="w-48 doc-table-head">Viewers</th>
              <th className="w-44 doc-table-head">Actions</th>
            </tr>
          </thead>
          <tbody>
            {businessContinuityPlans.map((bcp) => (
              <tr key={bcp._id} className="doc-table-hover">
                <td className="p-1 doc-table-data text-center">{bcp.bcpid}</td>
                <td className="p-1 doc-table-data">{bcp.legalEntity}</td>
                <td className="p-1 doc-table-data">{bcp.approver}</td>
                <td className="p-1 doc-table-data">{bcp.owner}</td>
                <td className="p-1 doc-table-data">{bcp.maintainer}</td>
                <td className="p-1 doc-table-data">
                  {bcp.viewers?.join(", ")}
                </td>
                <td className="p-1 doc-table-data">
                  <div className="flex justify-center gap-2">
                    <Link
                      to={`/Business-Continuity-Plan/bcp-form/${bcp.bcpid}`}
                      className="bg-indigo-800 text-white px-2 py-1 rounded font-semibold text-sm"
                    >
                      View
                    </Link>
                    <button
                      className="doc-delete-btn"
                      onClick={() =>
                        deleteBusinessContinuityPlan(bcp._id, bcp.bcpid)
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

export default BusinessContinuityPlans;
