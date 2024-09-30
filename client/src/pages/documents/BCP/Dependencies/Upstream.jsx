import { useState } from "react";
import { Link } from "react-router-dom";

const Upstream = ({ cbFunction }) => {
  const [upstream, setUpstream] = useState([]);

  const handleDelete = async (id) => {};

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
          {upstream.map((external) => (
            <tr key={external._id} className="doc-table-hover">
              <td className="py-2 px-4 doc-table-data">
                {external.externalDependencies}
              </td>
              <td className="py-2 px-4 doc-table-data">
                {external.requirments}
              </td>

              <td className="py-2 px-4 w-32 doc-table-data">
                <div className="flex justify-center gap-2">
                  <Link
                    to={`/editExternalDependencies/${external._id}`}
                    state={{ activeTab: "externalDependencies" }}
                    className="doc-edit-btn"
                  >
                    Edit
                  </Link>
                  <button
                    className="doc-delete-btn"
                    onClick={() => handleDelete(external._id)}
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
