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
    <div className="w-full h-full flex flex-col">
      <h1 className="text-3xl mb-5 font-bold text-green-500">
        Context Of The Organization
      </h1>
      <ContextNavigation />

      <div className="p-5 h-full bg-sky-100 rounded-2xl mt-5">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-900">Version Control</h1>
          <Link to="/createVersion">
            <button className="btn-primary">Create Version Control</button>
          </Link>
        </div>

        {/* Table */}
        <div className="mt-5 h-full overflow-auto">
          <table className="relative w-full h-full bg-cyan-50">
            <thead className="sticky top-0 bg-white">
              <tr>
                <th className="border-2 border-black">Serial Number</th>
                <th className="border-2 border-black">Version Number</th>
                <th className="border-2 border-black">Prepared By</th>
                <th className="border-2 border-black">Approved By</th>
                <th className="border-2 border-black w-96">
                  Reasons for new release
                </th>
                <th className="border-2 border-black">Actions</th>
              </tr>
            </thead>
            <tbody>
              {versionControls.map((v) => (
                <tr key={v.id}>
                  <td className="p-3 border-2 border-black">{v.serialNo}</td>
                  <td className="p-3 border-2 border-black">{v.versionNo}</td>
                  <td className="p-3 border-2 border-black">{v.prepare}</td>
                  <td className="p-3 border-2 border-black">{v.approve}</td>
                  <td className="p-3 border-2 border-black w-96">
                    {v.reasons}
                  </td>
                  <td className="border-2 border-black ">
                    <div className="flex justify-center items-center gap-3">
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
    </div>
    // </div>
  );
};

export default VersionControls;
