import { useState } from "react";
import { Link } from "react-router-dom";

const CriticalBusinessFunction = () => {
  const [criticalBusinessFunction, setCriticalBusinessFunction] = useState([]);

  const deleteResourcesRequired = async (id) => {};

  return (
    <div className="px-5 pt-4 pb-16 w-full h-full overflow-hidden">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-xl font-bold text-indigo-900">
          Critical Business Functions
        </h1>
        <Link
          to="/createCriticalBusinessFunction"
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
              <th className="w-20 doc-table-border">Name</th>
              <th className="w-20 doc-table-border">Description</th>
              <th className="w-20 doc-table-border">Criticality</th>
              <th className="w-36 doc-table-border">RTO</th>
              <th className="w-28 doc-table-border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {criticalBusinessFunction.map((cbf) => (
              <tr key={cbf._id} className="hover:bg-indigo-100">
                <td className="py-2 px-4 w-20 doc-table-border text-center">
                  {cbf.name}
                </td>
                <td className="py-2 px-4 w-20 doc-table-border text-center">
                  {cbf.description}
                </td>
                <td className="py-2 px-4 w-36 doc-table-border">
                  {cbf.criticality}
                </td>
                <td className="py-2 px-4 w-36 doc-table-border">{cbf.rto}</td>

                <td className="py-2 px-4 w-28 doc-table-border">
                  <div className="flex justify-center gap-2">
                    <Link
                      to={`/editCriticalBusinessFunction/${cbf._id}`}
                      className="doc-edit-btn"
                    >
                      Edit
                    </Link>
                    <button
                      className="doc-delete-btn"
                      onClick={() => deleteResourcesRequired(cbf._id)}
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

export default CriticalBusinessFunction;
