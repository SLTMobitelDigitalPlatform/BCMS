import { useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useBIAForm } from "../../../../hooks/documents/bia/useBIAForm";

const BiaDocumentControl = () => {
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
          Document Control
        </h1>
        <Link to="/createBIA" className="btn-primary">
          Create new Document
        </Link>
      </div>

      {/* Table */}
      <div className="h-full w-full overflow-auto">
        <table className="table-fixed w-full">
          <thead className="sticky top-0 bg-indigo-200">
            <tr>
              <th className="w-20 doc-table-head">Version</th>
              <th className="w-20 doc-table-head">Description</th>
              <th className="w-20 doc-table-head">Date</th>
              <th className="w-28 doc-table-head">Actions</th>
            </tr>
          </thead>
          <tbody>
            {businessImpactAnalysisPlans.map((bia) => (
              <tr key={bia.version} className="doc-table-hover">
                <td className="py-2 px-4 w-20 doc-table-data text-center">
                  {bia.version}
                </td>
                <td className="py-2 px-4 w-20 doc-table-data text-center">
                  {bia.description}
                </td>
                <td className="py-2 px-4 w-36 doc-table-data">
                  {bia.date}
                </td>
                <td className="py-2 px-4 w-28 doc-table-data">
                  <div className="flex justify-center gap-2">
                    <Link to={`/editBIA/${bia.version}`} className="doc-edit-btn">
                      Edit
                    </Link>
                    <button
                      className="doc-delete-btn"
                      onClick={() => deleteBusinessImpactAnalysisPlan(bia.version)}
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

export default BiaDocumentControl;
