import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useBCPForm } from "../../../../hooks/documents/bcp/useBCPForm";
import { FaSpinner } from "react-icons/fa";

const BCPForm = () => {
  const { bcpid } = useParams();

  const { businessContinuityPlan, loading, fetchBCPFormByBCPID } = useBCPForm();

  useEffect(() => {
    fetchBCPFormByBCPID(bcpid);
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <FaSpinner className="animate-spin text-blue-500 text-3xl" />
      </div>
    );

  return (
    // px-5 pt-4 pb-16 w-full h-full overflow-hidden
    <div className="p-8">
      <h1 className="text-2xl font-bold text-indigo-900 mb-8">
        Business Continuity Plan: {businessContinuityPlan.bcpid}
      </h1>

      {/* Plan Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          {/* <h2 className="font-semibold text-lg">Plan Details</h2> */}
          <div className="text-md space-y-3">
            <p>
              <span className="font-semibold">BCP ID: </span>
              {businessContinuityPlan.bcpid}
            </p>
            <p>
              <span className="font-semibold">Section: </span>
              {businessContinuityPlan.section}
            </p>
            <p>
              <span className="font-semibold">Year: </span>
              {businessContinuityPlan.year}
            </p>
            <p>
              <span className="font-semibold">Date: </span>
              {businessContinuityPlan.date}
            </p>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          {/* <h2 className="font-semibold text-lg">Template & Legal Info</h2> */}
          <div className="text-md space-y-3">
            <p>
              <span className="font-semibold">Template: </span>
              {businessContinuityPlan.template}
            </p>
            <p>
              <span className="font-semibold">Legal Entity: </span>
              {businessContinuityPlan.legalEntity}
            </p>
            <p>
              <span className="font-semibold">Approver: </span>
              {businessContinuityPlan.approver}
            </p>
          </div>
        </div>
      </div>

      {/* Roles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          {/* <h2 className="font-semibold text-lg">Responsible Parties</h2> */}
          <div className="text-md space-y-3">
            <p>
              <span className="font-semibold">Owner: </span>
              {businessContinuityPlan.owner}
            </p>
            <p>
              <span className="font-semibold">Maintainer: </span>
              {businessContinuityPlan.maintainer}
            </p>
            <p>
              <span className="font-semibold">Viewers: </span>
              {businessContinuityPlan.viewers?.join(", ")}
            </p>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          {/* <h2 className="font-semibold text-lg">Review Information</h2> */}
          <div className="text-md space-y-3">
            <p>
              <span className="font-semibold">Date Approved: </span>
              {businessContinuityPlan.dateApproved}
            </p>
            <p>
              <span className="font-semibold">Date Last Reviewed: </span>
              {businessContinuityPlan.dateLastReviewed}
            </p>
            <p>
              <span className="font-semibold">Next Review Due: </span>
              {businessContinuityPlan.dateDueForNextReview}
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4 mt-8">
        <Link
          to={`/editBCP/${businessContinuityPlan.bcpid}`}
          className="text-white rounded px-4 py-2 bg-blue-500 hover:bg-blue-600 transition ease-in-out duration-300"
        >
          Edit
        </Link>
        <Link
          to="/business-continuity-plans"
          className="text-white rounded px-4 py-2 bg-red-500 hover:bg-red-600 transition ease-in-out duration-300"
        >
          Back to Plans
        </Link>
      </div>
    </div>
  );
};

export default BCPForm;
