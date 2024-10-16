import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const RiskVersionControls = () => {
  const [versionControls, setVersionControls] = useState([]);

  const fetchVersionControls = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/versionControlsRisks/"
      );
      setVersionControls(response.data);
      // console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchVersionControls();
  }, []);

  // Delete a risk with SweetAlert2 confirmation
  const deleteVersionControl = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `http://localhost:5000/api/versionControlsRisk/delete/${id}`
          );
          setVersionControls(
            versionControls.filter(
              (versionControl) => versionControl._id !== id
            )
          );
          Swal.fire("Deleted!", "Version Control has been deleted.", "success");
        } catch (error) {
          console.error(error);
          Swal.fire(
            "Error!",
            "There was a problem deleting the record.",
            "error"
          );
        }
      }
    });
  };

  return (
    <div className="pt-5 w-full h-full flex flex-col">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-xl font-bold text-indigo-900">Version Control</h1>
        <Link to="/createRiskVersion" className="btn-primary">
          Create Version Control
        </Link>
      </div>

      {/* Table */}
      <div className="h-full w-full overflow-auto">
        <table className="table-fixed w-full">
          <thead className="sticky top-0 bg-indigo-200">
            <tr>
              <th className="w-20 doc-table-head">Serial Number</th>
              <th className="w-20 doc-table-head">Version Number</th>
              <th className="w-48 doc-table-head">Prepared By</th>
              <th className="w-48 doc-table-head">Checked By</th>
              <th className="w-48 doc-table-head">Approved By</th>
              <th className="w-36 doc-table-head">Reasons for new release</th>
              <th className="w-36 doc-table-head">Approval Status</th>
              <th className="w-28 doc-table-head">Actions</th>
            </tr>
          </thead>
          <tbody>
            {versionControls.map((v) => (
              <tr key={v.id} className="doc-table-hover">
                <td className="py-2 px-4 w-20 doc-table-data text-center">
                  {v.serialNo}
                </td>
                <td className="py-2 px-4 w-20 doc-table-data text-center">
                  {v.versionNo}
                </td>
                <td className="py-2 px-4 w-48 doc-table-data">
                  {v.prepare.name}
                </td>
                <td className="py-2 px-4 w-48 doc-table-data">
                  {v.checkedBy.name}
                </td>
                <td className="py-2 px-4 w-48 doc-table-data">
                  {v.approve.name}
                </td>
                <td className="py-2 px-4 w-36 doc-table-data">{v.reasons}</td>
                <td className="py-2 px-4 w-36 doc-table-data">
                  {v.isApproved}
                </td>
                <td className="py-2 px-4 w-28 doc-table-data">
                  <div className="flex justify-center gap-2">
                    <Link
                      to={`/editISRiskVersion/${v._id}`}
                      className="doc-edit-btn"
                    >
                      Edit
                    </Link>
                    <button
                      className="doc-delete-btn"
                      onClick={() => deleteVersionControl(v._id)}
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

export default RiskVersionControls;
