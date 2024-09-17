import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useEmbeddedDocuments } from "../../../../hooks/documents/bcp/useEmbeddedDocuments";

const EmbeddedDocuments = () => {
  // const [embeddedDocuments, setEmbeddedDocuments] = useState([]);

  const {
    embeddedDocuments,
    loading,
    error,
    fetchEmbeddedDocuments,
    deleteEmbeddedDocument,
  } = useEmbeddedDocuments();

  useEffect(() => {
    fetchEmbeddedDocuments();
  }, []);

  const deleteEmbeddedDoc = async (id) => {
    try {
      await deleteEmbeddedDocument(id);
      fetchEmbeddedDocuments();
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="px-5 pt-4 pb-16 w-full h-full overflow-hidden">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-xl font-bold text-indigo-900">
          Embedded List/Grab List
        </h1>
        <Link
          to="/createEmbeddedDocument"
          className="btn-primary font-semibold"
        >
          Add Details
        </Link>
      </div>

      {/* Table */}
      <div className="h-full w-full overflow-auto">
        <table className="table-fixed relative w-full py-10 bg-cyan-50">
          <thead className="sticky top-0 bg-indigo-800 text-white doc-table-border">
            <tr>
              <th className="w-20 doc-table-border">Number</th>
              <th className="w-20 doc-table-border">Description of Item</th>
              <th className="w-36 doc-table-border">Responsible Person</th>
              <th className="w-36 doc-table-border">
                Physical Location of Item
              </th>
              <th className="w-36 doc-table-border">Owner</th>
              <th className="w-28 doc-table-border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {embeddedDocuments.map((embedDoc) => (
              <tr key={embedDoc._id} className="hover:bg-indigo-100">
                <td className="py-2 px-4 w-20 doc-table-border text-center">
                  {embedDoc.number}
                </td>
                <td className="py-2 px-4 w-20 doc-table-border text-center">
                  {embedDoc.description}
                </td>
                <td className="py-2 px-4 w-36 doc-table-border">
                  {embedDoc.responsiblePerson}
                </td>
                <td className="py-2 px-4 w-36 doc-table-border">
                  {embedDoc.physicalLocation}
                </td>
                <td className="py-2 px-4 w-36 doc-table-border">
                  {embedDoc.owner}
                </td>
                <td className="py-2 px-4 w-28 doc-table-border">
                  <div className="flex justify-center gap-2">
                    <Link
                      to={`/editEmbeddedDocument/${embedDoc._id}`}
                      className="doc-edit-btn"
                    >
                      Edit
                    </Link>
                    <button
                      className="doc-delete-btn"
                      onClick={() => deleteEmbeddedDoc(embedDoc._id)}
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
