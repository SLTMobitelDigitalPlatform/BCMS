import { useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useDocumentControl } from "../../../../hooks/documents/bcp/useDocumentControl";
import { deleteAlert } from "../../../../utilities/alert";

const DocumentControl = () => {
  const {
    documentControls,
    loading,
    fetchDocumentControlsByBCPID,
    deleteDocumentControl,
  } = useDocumentControl();

  const { bcpid } = useParams();

  useEffect(() => {
    fetchDocumentControlsByBCPID(bcpid);
  }, []);

  const handleDelete = async (id, version) => {
    deleteAlert(
      "Are you sure?",
      `You are about to delete "${version}" Document Control. This action cannot be undone.`,
      "Yes, delete it!",
      `"${version}" Document Control deleted successfully!`,
      "Error deleting Document Control",
      () => deleteDocumentControl(id, bcpid)
    );
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <FaSpinner className="animate-spin text-blue-500 text-3xl" />
      </div>
    );

  return (
    <div className="pt-5 w-full h-full flex flex-col">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-xl font-bold text-indigo-900">Document Control</h1>
        <Link to={`/createDocumentControl/${bcpid}`} className="btn-primary">
          Add New Version
        </Link>
      </div>

      {/* Table */}
      <div className="h-full w-full overflow-auto">
        <table className="table-fixed w-full">
          <thead className="sticky top-0 bg-indigo-200">
            <tr>
              <th className="w-20 doc-table-head">Version</th>
              <th className="w-20 doc-table-head">Description</th>
              <th className="w-36 doc-table-head">Date</th>
              <th className="w-28 doc-table-head">Actions</th>
            </tr>
          </thead>
          <tbody>
            {documentControls.map((docControl) => (
              <tr key={docControl._id} className="doc-table-hover">
                <td className="py-2 px-4 w-20 doc-table-data text-center">
                  {docControl.version}
                </td>
                <td className="py-2 px-4 w-20 doc-table-data text-center">
                  {docControl.description}
                </td>
                <td className="py-2 px-4 w-36 doc-table-data">
                  {docControl.date}
                </td>
                <td className="py-2 px-4 w-28 doc-table-data">
                  <div className="flex justify-center gap-2">
                    <Link
                      to={`/editDocumentControl/${bcpid}/${docControl._id}`}
                      className="doc-edit-btn"
                    >
                      Edit
                    </Link>
                    <button
                      className="doc-delete-btn"
                      onClick={() =>
                        handleDelete(docControl._id, docControl.version)
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

export default DocumentControl;
