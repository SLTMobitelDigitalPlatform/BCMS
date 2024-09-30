import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ExternalDependencies = () => {
  const [externalDependencies, setExternalDependencies] = useState([]);

  const handleDelete = async (id) => {};

  return (
    <div className="pt-5 w-full h-full flex flex-col">
      {/* Table */}
      <div className="h-full w-full overflow-auto">
        <table className="table-fixed w-full">
          <thead className="sticky top-0 bg-indigo-200">
            <tr>
              <th className="w-52 doc-table-head">
                Critical Business Function
              </th>
              <th className="doc-table-head">Organization</th>
              <th className="w-32 doc-table-head">Dependencies</th>
              <th className="w-32 doc-table-head">Primary Contact</th>
              <th className="w-32 doc-table-head">Secondary Contact</th>
              <th className="w-32 doc-table-head">Justification</th>
            </tr>
          </thead>
          <tbody>
            {externalDependencies.map((external) => (
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
    </div>
  );
};

export default ExternalDependencies;
