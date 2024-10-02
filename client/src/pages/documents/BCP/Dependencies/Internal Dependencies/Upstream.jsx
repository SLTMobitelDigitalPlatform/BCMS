import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useUpstream } from "../../../../../hooks/documents/bcp/useUpstream";
import { FaSpinner } from "react-icons/fa";

const Upstream = ({ cbFunction }) => {
  const {
    upstreams,
    loading: upstreamsLoading,
    fetchUpstreamsByBCPID,
  } = useUpstream();

  const { bcpid } = useParams();

  useEffect(() => {
    fetchUpstreamsByBCPID(bcpid);
  }, []);

  const handleDelete = async (id) => {};

  if (upstreamsLoading)
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
            <th className="doc-table-head">Name of the Organization</th>
            <th className="w-32 doc-table-head">For What</th>
            <th className="w-32 doc-table-head">Primary Contact</th>
            <th className="w-32 doc-table-head">Secondary Contact</th>
            <th className="w-32 doc-table-head">RTO</th>
            <th className="w-32 doc-table-head">Justification</th>
            <th className="w-32 doc-table-head">Options</th>
            <th className="w-32 doc-table-head">Actions</th>
          </tr>
        </thead>
        <tbody>
          {upstreams.map((upstream) => (
            <tr key={upstream._id} className="doc-table-hover">
              <td className="py-2 px-4 doc-table-data">
                {upstream.organization}
              </td>
              <td className="py-2 px-4 doc-table-data">{upstream.forWhat}</td>
              <td className="py-2 px-4 doc-table-data">
                {upstream.primaryContact}
              </td>
              <td className="py-2 px-4 doc-table-data">
                {upstream.secondaryContact}
              </td>
              <td className="py-2 px-4 doc-table-data">{upstream.rto}</td>
              <td className="py-2 px-4 doc-table-data">
                {upstream.justification}
              </td>

              <td className="py-2 px-4 w-32 doc-table-data">
                <div className="flex justify-center gap-2">
                  <Link
                    to={`/editExternalDependencies/${upstream._id}`}
                    state={{ activeTab: "externalDependencies" }}
                    className="doc-edit-btn"
                  >
                    Edit
                  </Link>
                  <button
                    className="doc-delete-btn"
                    onClick={() => handleDelete(upstream._id)}
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

export default Upstream;
