import { useState } from "react";
import { Link } from "react-router-dom";

const LegalRequirements = () => {
  const [legalRequirements, setLegalRequirements] = useState([]);

  const deleteResourcesRequired = async (id) => {};

  return (
    <div className="px-5 pt-4 pb-16 w-full h-full overflow-hidden">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-xl font-bold text-indigo-900">
          Legal Regulatory & Contractual Requirements
        </h1>
        <Link
          to="/createLegalRequirements"
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
              <th className="w-20 doc-table-border">
                Name of the Organization
              </th>
              <th className="w-20 doc-table-border">
                Legal Regulatory & Contractual Requirements
              </th>
              <th className="w-36 doc-table-border">Monitored By</th>
              <th className="w-28 doc-table-border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {legalRequirements.map((resourcesRequired) => (
              <tr key={resourcesRequired._id} className="hover:bg-indigo-100">
                <td className="py-2 px-4 w-20 doc-table-border text-center">
                  {resourcesRequired.name}
                </td>
                <td className="py-2 px-4 w-20 doc-table-border text-center">
                  {resourcesRequired.legalRequirements}
                </td>
                <td className="py-2 px-4 w-36 doc-table-border">
                  {resourcesRequired.monitoredBy}
                </td>
                <td className="py-2 px-4 w-28 doc-table-border">
                  <div className="flex justify-center gap-2">
                    <Link
                      to={`/editLegalRequirements/${resourcesRequired._id}`}
                      className="doc-edit-btn"
                    >
                      Edit
                    </Link>
                    <button
                      className="doc-delete-btn"
                      onClick={() =>
                        deleteResourcesRequired(resourcesRequired._id)
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

export default LegalRequirements;
