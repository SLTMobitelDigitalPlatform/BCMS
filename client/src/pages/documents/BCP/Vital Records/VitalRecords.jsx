import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import { useUsers } from "../../../../hooks/useUsers";

const VitalRecords = () => {
  const [vitalRecord, setVitalRecord] = useState([]);

  const deleteWorkAreaRecovery = async (id) => {};

  return (
    <div className="px-5 pt-4 pb-16 w-full h-full overflow-hidden">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-xl font-bold text-indigo-900">Vital Records</h1>
        <Link to="/createVitalRecord" className="btn-primary font-semibold">
          Add Details
        </Link>
      </div>

      {/* Table */}
      <div className="h-full w-full overflow-auto">
        <table className="table-fixed relative w-full py-10 bg-cyan-50">
          <thead className="sticky top-0 bg-indigo-800 text-white doc-table-border">
            <tr>
              <th className="w-20 doc-table-border">Name</th>
              <th className="w-36 doc-table-border">Description</th>
              <th className="w-36 doc-table-border">Options</th>
              <th className="w-36 doc-table-border">Locations</th>
              <th className="w-36 doc-table-border">Third Party Contact</th>
              <th className="w-36 doc-table-border">Time Required</th>
              <th className="w-36 doc-table-border">Record Recovery Point</th>
              <th className="w-44 doc-table-border">
                If this record can be re-created, state how and from where
              </th>
              <th className="w-28 doc-table-border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vitalRecord.map((vitalRec) => (
              <tr key={vitalRec._id} className="hover:bg-indigo-100">
                <td className="py-2 px-4 w-20 doc-table-border text-center">
                  {vitalRec.name}
                </td>
                <td className="py-2 px-4 w-36 doc-table-border text-center">
                  {vitalRec.description}
                </td>
                <td className="py-2 px-4 w-36 doc-table-border">
                  {vitalRec.options}
                </td>
                <td className="py-2 px-4 w-36 doc-table-border">
                  {vitalRec.locations}
                </td>
                <td className="py-2 px-4 w-36 doc-table-border">
                  {vitalRec.thirdPartyContact}
                </td>
                <td className="py-2 px-4 w-36 doc-table-border">
                  {vitalRec.timeRequired}
                </td>
                <td className="py-2 px-4 w-36 doc-table-border">
                  {vitalRec.recordRecoveryPoint}
                </td>
                <td className="py-2 px-4 w-36 doc-table-border">
                  {vitalRec.recoveryStrategy}
                </td>
                <td className="py-2 px-4 w-28 doc-table-border">
                  <div className="flex justify-center gap-2">
                    <Link
                      to={`/editVitalRecords/${vitalRec._id}`}
                      className="doc-edit-btn"
                    >
                      Edit
                    </Link>
                    <button
                      className="doc-delete-btn"
                      onClick={() => deleteWorkAreaRecovery(vitalRec._id)}
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

export default VitalRecords;
