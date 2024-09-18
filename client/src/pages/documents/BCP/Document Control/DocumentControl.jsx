import { useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useDocumentControl } from "../../../../hooks/documents/bcp/useDocumentControl";

const DocumentControl = () => {
  const { documentControl, loading, error, fetchDocumentControlsByBCPID } =
    useDocumentControl();

  const { bcpid } = useParams();

  useEffect(() => {
    fetchDocumentControlsByBCPID(bcpid);
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <FaSpinner className="animate-spin text-blue-500 text-3xl" />
      </div>
    );
  if (error) return <div>{error}</div>;

  return (
    <div className="px-5 pt-4 pb-16 w-full h-full overflow-hidden">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-xl font-bold text-indigo-900">
          {bcpid}: Document Control
        </h1>
        <Link
          to={`/createDocumentControl/${bcpid}`}
          className="btn-primary font-semibold"
        >
          Add New Version
        </Link>
      </div>

      {/* Table */}
      <div className="h-full w-full overflow-auto">
        <table className="table-fixed relative w-full py-10 bg-cyan-50">
          <thead className="sticky top-0 bg-indigo-800 text-white doc-table-border">
            <tr>
              <th className="w-20 doc-table-border">Version</th>
              <th className="w-20 doc-table-border">Description</th>
              <th className="w-36 doc-table-border">Date</th>
              <th className="w-28 doc-table-border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {documentControl.map((docControl) => (
              <tr key={docControl._id} className="hover:bg-indigo-100">
                <td className="py-2 px-4 w-20 doc-table-border text-center">
                  {docControl.version}
                </td>
                <td className="py-2 px-4 w-20 doc-table-border text-center">
                  {docControl.description}
                </td>
                <td className="py-2 px-4 w-36 doc-table-border">
                  {docControl.date}
                </td>
                <td className="py-2 px-4 w-28 doc-table-border">
                  <div className="flex justify-center gap-2">
                    <Link
                      to={`/editDocumentControl/${docControl._id}`}
                      className="doc-edit-btn"
                    >
                      Edit
                    </Link>
                    <button className="doc-delete-btn">Delete</button>
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
