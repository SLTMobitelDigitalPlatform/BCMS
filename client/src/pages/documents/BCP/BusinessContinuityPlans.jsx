import { useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useBCPForm } from "../../../hooks/documents/bcp/useBCPForm";

const BusinessContinuityPlans = () => {
  const {
    businessContinuityPlans,
    loading,
    error,
    fetchBCPForms,
    deleteBCPForm,
  } = useBCPForm();

  useEffect(() => {
    fetchBCPForms();
  }, []);

  const deleteBusinessContinuityPlan = async (id) => {
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
          await deleteBCPForm(id);
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
        <h1 className="topic">Business Continuity Plans</h1>
        <Link to="/createBCP" className="btn-primary font-semibold">
          Create Plan
        </Link>
      </div>

      {/* Table */}
      <div className="h-full w-full overflow-auto">
        <table className="table-fixed relative w-full py-10 bg-cyan-50">
          <thead className="sticky top-0 bg-indigo-800 text-white doc-table-border">
            <tr>
              <th className="w-32 doc-table-border">BCP ID</th>

              <th className="w-44 doc-table-border">Legal Entity</th>
              <th className="w-44 doc-table-border">Approver</th>
              <th className="w-44 doc-table-border">Owner</th>
              <th className="w-44 doc-table-border">Maintainer</th>
              <th className="w-48 doc-table-border">Viewers</th>

              <th className="w-44 doc-table-border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {businessContinuityPlans.map((bcp) => (
              <tr key={bcp._id} className="hover:bg-indigo-100">
                <td className="p-1 doc-table-border text-center">
                  {bcp.bcpid}
                </td>

                <td className="p-1 doc-table-border text-center">
                  {bcp.legalEntity}
                </td>
                <td className="p-1 doc-table-border text-center">
                  {bcp.approver}
                </td>
                <td className="p-1 doc-table-border text-center">
                  {bcp.owner}
                </td>
                <td className="p-1 doc-table-border text-center">
                  {bcp.maintainer}
                </td>
                <td className="p-1 doc-table-border text-center">
                  {bcp.viewers?.join(", ")}
                </td>

                <td className="p-1 doc-table-border">
                  <div className="flex justify-center gap-2">
                    <Link
                      to={`/Business-Continuity-Plan/bcp-form/${bcp.bcpid}`}
                      className="bg-indigo-800 text-white px-2 py-1 rounded font-semibold text-sm"
                    >
                      View
                    </Link>

                    <button
                      className="doc-delete-btn"
                      onClick={() => deleteBusinessContinuityPlan(bcp._id)}
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
