import { useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useRelatedDocuments } from "../../../../hooks/documents/bcp/useRelatedDocuments";
import { deleteAlert } from "../../../../utilities/alert";

const RelatedDocuments = () => {
  const {
    relatedDocuments,
    loading,
    fetchRelatedDocumentsByBCPID,
    deleteRelatedDocument,
  } = useRelatedDocuments();

  const { bcpid } = useParams();

  useEffect(() => {
    fetchRelatedDocumentsByBCPID(bcpid);
  }, [bcpid]);

  const handleDelete = async (id, refDoc) => {
    deleteAlert(
      "Are you sure?",
      `You are about to delete "${refDoc}" Related Document. This action cannot be undone.`,
      "Yes, delete it!",
      `"${refDoc}" Related Document deleted successfully!`,
      "Error deleting Related Document",
      () => deleteRelatedDocument(id, bcpid)
    );
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <FaSpinner className="animate-spin text-blue-500 text-3xl" />
      </div>
    );

  return (
    <div className="px-5 pt-4 pb-16 w-full h-full overflow-hidden">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-xl font-bold text-indigo-900">Related Documents</h1>
        <Link
          to={`/createRelatedDocument/${bcpid}`}
          className="btn-primary font-semibold"
        >
          Add New Related Document
        </Link>
      </div>

      {/* Table */}
      <div className="h-full w-full overflow-auto">
        <table className="table-fixed relative w-full py-10 bg-cyan-50">
          <thead className="sticky top-0 bg-indigo-800 text-white doc-table-border">
            <tr>
              <th className="w-20 doc-table-border">Reference Document Name</th>
              <th className="w-20 doc-table-border">Document Type</th>
              <th className="w-20 doc-table-border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {relatedDocuments.map((relatedDoc) => (
              <tr key={relatedDoc._id} className="hover:bg-gray-100">
                <td className="py-2 px-4 w-20 doc-table-border text-center">
                  {relatedDoc.referenceDocument}
                </td>
                <td className="py-2 px-4 w-20 doc-table-border text-center">
                  {relatedDoc.documentType}
                </td>
                <td className="py-2 px-4 w-20 doc-table-border">
                  <div className="flex justify-center gap-2">
                    <Link
                      to={`/editRelatedDocument/${bcpid}/${relatedDoc._id}`}
                      className="doc-edit-btn"
                    >
                      Edit
                    </Link>
                    <button
                      className="doc-delete-btn"
                      onClick={() =>
                        handleDelete(
                          relatedDoc._id,
                          relatedDoc.referenceDocument
                        )
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

export default RelatedDocuments;
