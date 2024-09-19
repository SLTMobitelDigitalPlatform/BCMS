import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useBCPForm } from "../../../../hooks/documents/bcp/useBCPForm";

const BCPForm = () => {
  const { bcpid } = useParams();

  const { businessContinuityPlan, loading, error, fetchBCPFormByBCPID } =
    useBCPForm();

  useEffect(() => {
    fetchBCPFormByBCPID(bcpid);
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="h-full overflow-auto">
      <div className="flex flex-col gap-8 p-8 rounded-lg">
        <h1 className="text-2xl font-bold text-indigo-900">
          Business Continuity Plan: {businessContinuityPlan.bcpid}
        </h1>
        <div className="flex justify-between">
          <div className="text-lg flex justify-between gap-2">
            <span className="font-semibold">BCP ID:</span>
            <span>{businessContinuityPlan.bcpid}</span>
          </div>
          <div className="text-lg flex justify-between gap-2">
            <span className="font-semibold">Section:</span>
            <span>{businessContinuityPlan.section}</span>
          </div>
          <div className="text-lg flex justify-between gap-2">
            <span className="font-semibold">Year:</span>
            <span>{businessContinuityPlan.year}</span>
          </div>
        </div>

        <div className="flex justify-between">
          <div className="text-lg flex justify-between gap-2">
            <span className="font-semibold">Date:</span>
            <span>{businessContinuityPlan.date}</span>
          </div>
          <div className="text-lg flex justify-between gap-2">
            <span className="font-semibold">Template:</span>
            <span>{businessContinuityPlan.template}</span>
          </div>
        </div>

        <div className="flex justify-between">
          <div className="text-lg flex justify-between gap-2">
            <span className="font-semibold">Legal Entity:</span>
            <span>{businessContinuityPlan.legalEntity}</span>
          </div>
          <div className="text-lg flex justify-between gap-2">
            <span className="font-semibold">Approver:</span>
            <span>{businessContinuityPlan.approver}</span>
          </div>
        </div>

        <div className="flex justify-between">
          <div className="text-lg flex justify-between gap-2">
            <span className="font-semibold">Owner:</span>
            <span>{businessContinuityPlan.owner}</span>
          </div>
          <div className="text-lg flex justify-between gap-2">
            <span className="font-semibold">Maintainer:</span>
            <span>{businessContinuityPlan.maintainer}</span>
          </div>
        </div>

        <div className="text-lg flex gap-2">
          <span className="font-semibold">Viewers:</span>
          <span>{businessContinuityPlan.viewers}</span>
        </div>

        <div className="flex justify-between gap-6">
          <div className="text-lg flex justify-between gap-2">
            <span className="font-semibold">Date Approved:</span>
            <span>{businessContinuityPlan.dateApproved}</span>
          </div>
          <div className="text-lg flex justify-between gap-2">
            <span className="font-semibold">Date Last Reviewed:</span>
            <span>{businessContinuityPlan.dateLastReviewed}</span>
          </div>
          <div className="text-lg flex justify-between gap-2">
            <span className="font-semibold">Date Due for Next Review:</span>
            <span>{businessContinuityPlan.dateDueForNextReview}</span>
          </div>
        </div>

        <div className="flex justify-start gap-4">
          <Link
            to={`/editBCP/${businessContinuityPlan.bcpid}`}
            className="text-white rounded px-4 py-2 bg-sky-500 hover:bg-sky-600 transition ease-in-out duration-300"
          >
            Edit
          </Link>
          <Link
            to="/business-continuity-plans"
            className="text-white rounded px-4 py-2 bg-red-500 hover:bg-red-600 transition ease-in-out duration-300"
          >
            Back to List
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BCPForm;
