import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import ContextNavigation from "../../../../components/ContextNavigation";

const VersionControls = () => {
  const [versionControls, setVersionControls] = useState([]);

  const fetchVersionControls = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/versionControls/"
      );
      setVersionControls(response.data);
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
            `http://localhost:5000/api/versionControls/delete/${id}`
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
    <div className="px-5 pt-4 pb-16 w-full h-full overflow-hidden">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold text-blue-900">Version Control</h1>
        <Link to="/createVersion">
          <button className="btn-primary font-semibold">
            Create Version Control
          </button>
        </Link>
      </div>

      {/* Table */}
      <div className="h-full w-full overflow-auto">
        <table className="relative w-full py-10 bg-cyan-50">
          <thead className="sticky top-0 bg-indigo-800 text-white border border-green-500">
            <tr>
              <th className="w-20 border border-green-500">Serial Number</th>
              <th className="w-20 border border-green-500">Version Number</th>
              <th className="w-40 border border-green-500">Prepared By</th>
              <th className="w-40 border border-green-500">Approved By</th>
              <th className="w-80 border border-green-500">
                Reasons for new release
              </th>
              <th className="w-32 border border-green-500">Approval Status</th>
              <th className="w-28 border border-green-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {versionControls.map((v) => (
              <tr key={v.id}>
                <td className="py-2 px-4 w-20 border border-green-500">
                  {v.serialNo}
                </td>
                <td className="py-2 px-4 w-20 border border-green-500">
                  {v.versionNo}
                </td>
                <td className="py-2 px-4 w-40 border border-green-500">
                  {v.prepare}
                </td>
                <td className="py-2 px-4 w-40 border border-green-500">
                  {v.approve}
                </td>
                <td className="py-2 px-4 w-80 border border-green-500">
                  {v.reasons}
                </td>
                <td className="py-2 px-4 w-32 border border-green-500">
                  {v.isApproved}
                </td>
                <td className="px-3 w-28 border border-green-500 ">
                  <div className="flex justify-between">
                    <Link to={`/editVersion/${v._id}`}>
                      <button className="px-1 bg-blue-500 text-white rounded">
                        Edit
                      </button>
                    </Link>
                    <button
                      className="px-1 bg-red-500 text-white rounded"
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

export default VersionControls;
