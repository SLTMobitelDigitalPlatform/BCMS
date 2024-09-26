import { useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useBIAForm } from "../../../../hooks/documents/bia/useBIAForm";

const BIAForm = () => {
  const {
    businessImpactAnalysisPlans,
    loading,
    error,
    fetchBIAForms,
    deleteBIAForm,
  } = useBIAForm();

  useEffect(() => {
    fetchBIAForms();
  }, []);

  const deleteBusinessImpactAnalysisPlan = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteBIAForm(id);
          Swal.fire("Deleted!", "Version Control has been deleted.", "success");
        } catch (error) {
          console.error(error);
          Swal.fire(
            "Error!",
            "There was a problem deleting the record.",
            "error"
          );
        }
      }
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="pt-5 w-full h-full flex flex-col">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-xl font-bold text-indigo-900">
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
                  {bia.docNo}
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
