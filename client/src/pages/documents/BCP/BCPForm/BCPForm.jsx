import { useState } from "react";
import { Link } from "react-router-dom";

const BCPForm = () => {
  const [businessContinuityPlans, setBusinessContinuityPlans] = useState([]);

  const deleteBusinessContinuityPlan = async (id) => {};

  return (
    <div className="px-5 pt-4 pb-16 w-full h-full overflow-hidden">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-xl font-bold text-indigo-900">
          Business Continuity Plans
        </h1>
        <Link to="/createBCP" className="btn-primary font-semibold">
          Create Plan
        </Link>
      </div>

      {/* Table */}
      <div className="h-full w-full overflow-auto">
        <table className="table-fixed relative w-full py-10 bg-cyan-50">
          <thead className="sticky top-0 bg-indigo-800 text-white doc-table-border">
            <tr>
              <th className="w-20 doc-table-border">Plan Number</th>
              <th className="w-20 doc-table-border">Date</th>
              <th className="w-36 doc-table-border">Template</th>
              <th className="w-36 doc-table-border">Legal Entity</th>
              <th className="w-36 doc-table-border">Approver</th>
              <th className="w-36 doc-table-border">Maintainer</th>
              <th className="w-36 doc-table-border">Date Approved</th>
              <th className="w-28 doc-table-border">Date Last Reviewed</th>
              <th className="w-28 doc-table-border">
                Date Due for Next Review
              </th>
              <th className="w-28 doc-table-border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {businessContinuityPlans.map((bcp) => (
              <tr key={bcp._id} className="hover:bg-indigo-100">
                <td className="py-2 px-4 w-20 doc-table-border text-center">
                  {bcp.serialNo}
                </td>
                <td className="py-2 px-4 w-20 doc-table-border text-center">
                  {bcp.versionNo}
                </td>
                <td className="py-2 px-4 w-36 doc-table-border">
                  {bcp.prepare}
                </td>
                <td className="py-2 px-4 w-36 doc-table-border">
                  {bcp.checkedBy}
                </td>
                <td className="py-2 px-4 w-36 doc-table-border">
                  {bcp.approve}
                </td>
                <td className="py-2 px-4 w-36 doc-table-border">
                  {bcp.reasons}
                </td>
                <td className="py-2 px-4 w-36 doc-table-border">
                  {bcp.isApproved}
                </td>
                <td className="py-2 px-4 w-28 doc-table-border">
                  <div className="flex justify-center gap-2">
                    <Link to={`/editBCP/${bcp._id}`} className="doc-edit-btn">
                      Edit
                    </Link>
                    <button
                      className="doc-delete-btn"
                      onClick={() => deleteBusinessContinuityPlan(bcp._id)}
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

export default BCPForm;
