import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { useBIAForm } from "../../../../hooks/documents/bia/useBIAForm";

const BIAForm = () => {
  const { biaid } = useParams();

  const {
    businessImpactAnalysisPlan,
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
        Business Impact Analysis Plans: {businessImpactAnalysisPlan.biaid}
      </h1>

      {/* Plan Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-indigo-100 p-4 rounded-lg shadow-sm">
          <div className="text-md space-y-3">
            <p>
              <span className="font-semibold">Document Number:</span>
              {businessImpactAnalysisPlan.biaid}
            </p>
            <p>
              <span className="font-semibold">Date:</span>
              {businessImpactAnalysisPlan.date}
            </p>
            <p>
              <span className="font-semibold">Template: </span>
              {businessImpactAnalysisPlan.template}
            </p>
            <p>
              <span className="font-semibold">Legal Entity: </span>
              {businessImpactAnalysisPlan.legalEntity}
            </p>
            <p>
              <span className="font-semibold">Date Approved: </span>
              {businessImpactAnalysisPlan.dateApproved}
            </p>
            <p>
              <span className="font-semibold">Date Last Reviewed: </span>
              {businessImpactAnalysisPlan.dateLastReviewed}
            </p>
            <p>
              <span className="font-semibold">Date Due for Next Review: </span>
              {businessImpactAnalysisPlan.dateDueForNextReview}
            </p>
          </div>
        </div>

        <div className="bg-indigo-100 p-4 rounded-lg shadow-sm">
          <div className="text-md space-y-3">
            <p>
              <span className="font-semibold">Approver: </span>
              {businessImpactAnalysisPlan.approver}
            </p>
            <p>
              <span className="font-semibold">Owner: </span>
              {businessImpactAnalysisPlan.owner}
            </p>
            <p>
              <span className="font-semibold">Maintainers: </span>
              {businessImpactAnalysisPlan.maintainers}
            </p>
            <p>
              <span className="font-semibold">Viewers: </span>
              {businessImpactAnalysisPlan.viewers}
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4 mt-8">
        <Link
          to={`/editBIA/${businessImpactAnalysisPlan.biaid}`}
          className="text-white rounded px-4 py-2 bg-blue-500 hover:bg-blue-600 transition ease-in-out duration-300"
        >
          Edit
        </Link>
        <Link
          to="/business-impact-analysis-plans"
          className="text-white rounded px-4 py-2 bg-red-500 hover:bg-red-600 transition ease-in-out duration-300"
        >
          Back to Plans
        </Link>
      </div>
    </div>
  );
};

export default BIAForm;
