import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { useBIAForm } from "../../../../hooks/documents/bia/useBIAForm";

const BIAForm = () => {
  const { biaid } = useParams();

  const {
    businessImpactAnalysisPlans,
    loading,
    fetchBIAFormByBIAID    
  } = useBIAForm();

  useEffect(() => {
    fetchBIAFormByBIAID(biaid);
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <FaSpinner className="animate-spin text-blue-500 text-3xl" />
      </div>
    );

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-indigo-900 mb-8">
        Business Impact Analysis Plans: {businessImpactAnalysisPlans.bcpid}
      </h1>

      {/* Plan Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-indigo-100 p-4 rounded-lg shadow-sm">
          <div className="text-md space-y-3">
            <p>
              <span className="font-semibold">BIA ID: </span>
              {businessImpactAnalysisPlans.bcpid}
            </p>
            <p>
              <span className="font-semibold">Section: </span>
              {businessImpactAnalysisPlans.section}
            </p>
            <p>
              <span className="font-semibold">Year: </span>
              {businessImpactAnalysisPlans.year}
            </p>
            <p>
              <span className="font-semibold">Date: </span>
              {businessImpactAnalysisPlans.date}
            </p>
          </div>
        </div>

        <div className="bg-indigo-100 p-4 rounded-lg shadow-sm">
          {/* <h2 className="font-semibold text-lg">Template & Legal Info</h2> */}
          <div className="text-md space-y-3">
            <p>
              <span className="font-semibold">Template: </span>
              {businessImpactAnalysisPlans.template}
            </p>
            <p>
              <span className="font-semibold">Legal Entity: </span>
              {businessImpactAnalysisPlans.legalEntity}
            </p>
            <p>
              <span className="font-semibold">Approver: </span>
              {businessImpactAnalysisPlans.approver}
            </p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="h-full w-full overflow-auto">
        <table className="table-fixed w-full">
          <thead className="sticky top-0 bg-indigo-200">
            <tr>
              <th className="w-20 doc-table-head">Document Number</th>
              <th className="w-20 doc-table-head">Date</th>
              <th className="w-20 doc-table-head">Template</th>
              <th className="w-28 doc-table-head">Legal Entity</th>
              <th className="w-28 doc-table-head">Approver</th>
              <th className="w-28 doc-table-head">Owner</th>
              <th className="w-28 doc-table-head">Maintainers</th>
              <th className="w-28 doc-table-head">Viewers</th>
              <th className="w-28 doc-table-head">Date Approved</th>
              <th className="w-28 doc-table-head">Date Last Reviewed</th>
              <th className="w-28 doc-table-head">Date Due for Next Review</th>
              <th className="w-28 doc-table-head">Actions</th>
            </tr>
          </thead>
          <tbody>
            {businessImpactAnalysisPlans.map((bia) => (
              <tr key={bia._id} className="doc-table-hover">
                <td className="py-2 px-4 w-20 doc-table-data text-center">
                  {bia.biaid}
                </td>
                <td className="py-2 px-4 w-20 doc-table-data text-center">
                  {bia.date}
                </td>
                <td className="py-2 px-4 w-36 doc-table-data">
                  {bia.template}
                </td>
                <td className="py-2 px-4 w-36 doc-table-data">
                  {bia.legalEntity}
                </td>
                <td className="py-2 px-4 w-36 doc-table-data">
                  {bia.approver}
                </td>
                <td className="py-2 px-4 w-36 doc-table-data">{bia.owner}</td>
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
                <td className="py-2 px-4 w-36 doc-table-data">
                  {bia.dateApproved}
                </td>
                <td className="py-2 px-4 w-36 doc-table-data">
                  {bia.dateLastReviewed}
                </td>
                <td className="py-2 px-4 w-36 doc-table-data">
                  {bia.dateDueForNextReview}
                </td>
                <td className="py-2 px-4 w-28 doc-table-data">
                  <div className="flex justify-center gap-2">
                    <Link to={`/editBIA/${bia._id}`} className="doc-edit-btn">
                      Edit
                    </Link>
                    <button
                      className="doc-delete-btn"
                      onClick={() => deleteBusinessImpactAnalysisPlan(bia._id)}
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

export default BIAForm;
