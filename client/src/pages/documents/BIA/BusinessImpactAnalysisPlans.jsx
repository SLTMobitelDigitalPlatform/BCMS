import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useBIAForm } from "../../../hooks/documents/bia/useBIAForm";
import { deleteAlert } from "../../../utilities/alert";
import { FaSpinner } from "react-icons/fa";

const BusinessImpactAnalysisPlans = () => {
  const { businessImpactAnalysisPlans, loading, fetchBIAForms, deleteBIAForm } =
    useBIAForm();

  useEffect(() => {
    fetchBIAForms();
  }, []);

  const deleteBusinessImpactAnalysisPlan = async (id, biaid) => {
    deleteAlert(
      "Are you sure?",
      `You are about to delete Business Impact Analysis Plan "${biaid}". This action cannot be undone.`,
      "Yes, delete it!",
      `Business Impact Analysis Plan "${biaid}" deleted successfully!`,
      `Error deleting Business Impact Analysis Plan "${biaid}"`,
      async () => await deleteBIAForm(id)
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
          Business Impact Analysis Plans
        </h1>
        <Link to="/createBIA" className="btn-primary">
          Create Plan
        </Link>
      </div>

      {/* Table */}
      <div className="h-full w-full overflow-auto">
        <table className="table-fixed w-full">
          <thead className="sticky top-0 bg-indigo-200">
            <tr>
              <th className="w-20 doc-table-head">Document Number</th>
              <th className="w-28 doc-table-head">Legal Entity</th>
              <th className="w-28 doc-table-head">Approver</th>
              <th className="w-28 doc-table-head">Owner</th>
              <th className="w-28 doc-table-head">Maintainers</th>
              <th className="w-28 doc-table-head">Viewers</th> 
              <th className="w-28 doc-table-head">Actions</th>
            </tr>
          </thead>
          <tbody>
            {businessImpactAnalysisPlans.map((bia) => (
              <tr key={bia._id} className="doc-table-hover">
                <td className="p-1 doc-table-data text-center">{bia.biaid}</td>
                <td className="p-1 doc-table-data">{bia.legalEntity}</td>
                <td className="p-1 doc-table-data">{bia.approver}</td>
                <td className="p-1 doc-table-data">{bia.owner}</td>
                <td className="py-2 px-4 w-36 doc-table-data">
                  {bia.maintainers && bia.maintainers.length > 0 ? (
                    bia.maintainers.join(", ")
                  ) : (
                    <span>No maintainers</span>
                  )}
                </td>
                <td className="py-2 px-4 w-36 doc-table-data">
                  {bia.viewers && bia.viewers.length > 0 ? (
                    bia.viewers.join(", ")
                  ) : (
                    <span>No viewers</span>
                  )}
                </td>
                <td className="p-1 doc-table-data">
                  <div className="flex justify-center gap-2">
                    <Link
                      to={`/Business-Impact-Analysis/bia-form/${bia.biaid}`}
                      className="bg-indigo-800 text-white px-2 py-1 rounded font-semibold text-sm"
                    >
                      View
                    </Link>
                    <button
                      className="doc-delete-btn"
                      onClick={() =>
                        deleteBusinessImpactAnalysisPlan(bia._id, bia.biaid)
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

export default BusinessImpactAnalysisPlans;
