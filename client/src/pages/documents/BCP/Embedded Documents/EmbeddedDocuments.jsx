import { useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useEmbeddedDocuments } from "../../../../hooks/documents/bcp/useEmbeddedDocuments";
import { deleteAlert } from "../../../../utilities/alert";

const EmbeddedDocuments = () => {
  const {
    embeddedDocuments,
    loading,
    fetchEmbeddedDocumentsByBCPID,
    deleteEmbeddedDocument,
  } = useEmbeddedDocuments();

  const { bcpid } = useParams();

  useEffect(() => {
    fetchEmbeddedDocumentsByBCPID(bcpid);
  }, []);

  const handleDelete = async (id, number) => {
    deleteAlert(
      "Are you sure?",
      `You are about to delete "${number}" Embedded Document. This action cannot be undone.`,
      "Yes, delete it!",
      `"${number}" Embedded Document deleted successfully!`,
      "Error deleting Embedded Document",
      () => deleteEmbeddedDocument(id, bcpid)
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
        <h1 className="text-xl font-bold text-indigo-900">
          Embedded List/Grab List
        </h1>
        <Link to={`/createEmbeddedDocument/${bcpid}`} className="btn-primary">
          Add Details
        </Link>
      </div>

      {/* Table */}
      <div className="h-full w-full overflow-auto">
        <table className="table-fixed w-full">
          <thead className="sticky top-0 bg-indigo-200">
            <tr>
              <th className="w-20 doc-table-head">Number</th>
              <th className="w-20 doc-table-head">Description of Item</th>
              <th className="w-36 doc-table-head">Responsible Person</th>
              <th className="w-36 doc-table-head">Physical Location of Item</th>
              <th className="w-36 doc-table-head">Owner</th>
              <th className="w-28 doc-table-head">Actions</th>
            </tr>
          </thead>
          <tbody>
            {embeddedDocuments.map((embedDoc) => (
              <tr key={embedDoc._id} className="doc-table-hover">
                <td className="py-2 px-4 w-20 doc-table-data text-center">
                  {embedDoc.number}
                </td>
                <td className="py-2 px-4 w-20 doc-table-data text-center">
                  {embedDoc.description}
                </td>
                <td className="py-2 px-4 w-36 doc-table-data">
                  {embedDoc.responsiblePerson}
                </td>
                <td className="py-2 px-4 w-36 doc-table-data">
                  {embedDoc.physicalLocation}
                </td>
                <td className="py-2 px-4 w-36 doc-table-data">
                  {embedDoc.owner}
                </td>
                <td className="py-2 px-4 w-28 doc-table-data">
                  <div className="flex justify-center gap-2">
                    <Link
                      to={`/editEmbeddedDocument/${bcpid}/${embedDoc._id}`}
                      className="doc-edit-btn"
                    >
                      Edit
                    </Link>
                    <button
                      className="doc-delete-btn"
                      onClick={() =>
                        handleDelete(embedDoc._id, embedDoc.number)
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

export default EmbeddedDocuments;
