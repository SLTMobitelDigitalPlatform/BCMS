import { useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import { Link, useLocation, useParams } from "react-router-dom";
import { useDownstream } from "../../../../../hooks/documents/bia/useDownstream";
import { deleteAlert } from "../../../../../utilities/alert";

const Downstream = () => {
  const {
    downstreams,
    loading: downstreamLoading,
    fetchDownstreamsByBIAID,
    deleteDownstream,
  } = useDownstream();

  const { biaid } = useParams();
  const location = useLocation();
  const cbfid = location.state?.cbfid;

  useEffect(() => {
    fetchDownstreamsByBIAID(biaid, cbfid.value);
  }, [cbfid]);

  const handleDelete = async (id) => {
    deleteAlert(
      "Are you sure?",
      "You are about to delete Operating Site. This action cannot be undone.",
      "Yes, delete it!",
      "Operating Site deleted successfully!",
      "Error deleting Operating Site",
      () => deleteDownstream(id, biaid)
    );
  };

  if (downstreamLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <FaSpinner className="animate-spin text-blue-500 text-3xl" />
      </div>
    );

  return (
    <div className="h-full w-full overflow-auto">
      <table className="table-fixed w-full">
        <thead className="sticky top-0 bg-indigo-200">
          <tr>
            <th className="w-20 doc-table-head">Name of the Section/Business Unit</th>
            <th className="w-16 doc-table-head">Primary Contact</th>
            <th className="w-16 doc-table-head">Secondary Contact</th>
            <th className="w-20 doc-table-head">Justification</th>
            <th className="w-16 doc-table-head">Actions</th>
          </tr>
        </thead>
        <tbody>
          {downstreams.map((downstream) => (
            <tr key={downstream._id} className="doc-table-hover">
              <td className="py-2 px-4 doc-table-data">
                {downstream.section}
              </td>
              <td className="py-2 px-4 doc-table-data">
                {downstream.primaryContact}
              </td>
              <td className="py-2 px-4 doc-table-data">
                {downstream.secondaryContact}
              </td>
              <td className="py-2 px-4 doc-table-data">
                {downstream.justification}
              </td>

              <td className="py-2 px-4 w-32 doc-table-data">
                <div className="flex justify-center gap-2">
                  <Link
                    to={`/editBIADownstream/${biaid}/${downstream._id}`}
                    state={{ activeTab: "externalDependencies" }}
                    className="doc-edit-btn"
                  >
                    Edit
                  </Link>
                  <button
                    className="doc-delete-btn"
                    onClick={() => handleDelete(downstream._id)}
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
  );
};

export default Downstream;
