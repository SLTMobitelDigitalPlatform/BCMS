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
    <div className="px-5 pt-4 pb-16 w-full h-full overflow-hidden">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-xl font-bold text-indigo-900">
          Business Impact Analysis Plans
        </h1>
        <Link to="/createBIA" className="btn-primary font-semibold">
          Create Plan
        </Link>
      </div>

      {/* Table */}
      <div className="h-full w-full overflow-auto">
        <table className="table-fixed relative w-full py-10 bg-cyan-50">
          <thead className="sticky top-0 bg-indigo-800 text-white doc-table-border">
            <tr>
              <th className="w-20 doc-table-border">Document Number</th>
              <th className="w-20 doc-table-border">Date</th>
              <th className="w-20 doc-table-border">Template</th>
              <th className="w-28 doc-table-border">Legal Entity</th>
              <th className="w-28 doc-table-border">Approver</th>
              <th className="w-28 doc-table-border">Owner</th>
              <th className="w-28 doc-table-border">Maintainers</th>
              <th className="w-28 doc-table-border">Viewers</th>
              <th className="w-28 doc-table-border">Date Approved</th>
              <th className="w-28 doc-table-border">Date Last Reviewed</th>
              <th className="w-28 doc-table-border">
                Date Due for Next Review
              </th>
              <th className="w-28 doc-table-border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {businessImpactAnalysisPlans.map((bia) => (
              <tr key={bia._id} className="hover:bg-gray-100">
                <td className="py-2 px-4 w-20 doc-table-border text-center">
                  {bia.docNo}
                </td>
                <td className="py-2 px-4 w-20 doc-table-border text-center">
                  {bia.date}
                </td>
                <td className="py-2 px-4 w-36 doc-table-border">
                  {bia.template}
                </td>
                <td className="py-2 px-4 w-36 doc-table-border">
                  {bia.legalEntity}
                </td>
                <td className="py-2 px-4 w-36 doc-table-border">
                  {bia.approver}
                </td>
                <td className="py-2 px-4 w-36 doc-table-border">{bia.owner}</td>
                <td className="py-2 px-4 w-36 doc-table-border">
                  {bia.maintainers && bia.maintainers.length > 0 ? (
                    bia.maintainers.join(", ")
                  ) : (
                    <span>No maintainers</span>
                  )}
                </td>
                <td className="py-2 px-4 w-36 doc-table-border">
                  {bia.viewers && bia.viewers.length > 0 ? (
                    bia.viewers.join(", ")
                  ) : (
                    <span>No viewers</span>
                  )}
                </td>
                <td className="py-2 px-4 w-36 doc-table-border">
                  {bia.dateApproved}
                </td>
                <td className="py-2 px-4 w-36 doc-table-border">
                  {bia.dateLastReviewed}
                </td>
                <td className="py-2 px-4 w-36 doc-table-border">
                  {bia.dateDueForNextReview}
                </td>
                <td className="py-2 px-4 w-28 doc-table-border">
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
