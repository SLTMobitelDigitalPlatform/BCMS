import Title from "../../../../components/Title";
import ContextNavigation from "../../../../components/ContextNavigation";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Sidebar from "../../../../components/Sidebar";
import RiskAssNavigation from "../../../../components/RiskAssNavigation";

const RiskVersionControls = () => {
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
    <div className="container mx-auto py-8">
      <div className="flex gap-x-10">
        <div>
          <div className=" border-2 w-[76vw] h-[575px] rounded-2xl ml-1 mr-50 mt-1 p-5">
            <Title />
            <div className="bg-sky-50 p-5 mt-8 rounded-xl">
              <RiskAssNavigation />
              <div className="flex justify-between items-center mt-8">
                <h1 className="text-2xl font-bold text-blue-900">
                  Version Control
                </h1>
                <Link to="/createVersion">
                  <button className="px-3 py-1 bg-[#52B14A] text-white font-semibold rounded-lg">
                    Create Version Control
                  </button>
                </Link>
              </div>
              <div className="mt-8">
                <table className="w-full border-2">
                  <thead>
                    <tr className="border-2">
                      <th className="border-2">Serial Number</th>
                      <th className="border-2">Version Number</th>
                      <th className="border-2">Prepared By</th>
                      <th className="border-2">Approved By</th>
                      <th className="border-2">Reasons for new release</th>
                      <th className="border-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {versionControls.map((v) => (
                      <tr key={v.id}>
                        <td className="border-2 p-3">{v.serialNo}</td>
                        <td className="border-2 p-3">{v.versionNo}</td>
                        <td className="border-2 p-3">{v.prepare}</td>
                        <td className="border-2 p-3">{v.approve}</td>
                        <td className="border-2 p-3">{v.reasons}</td>
                        <td className="border-2 p-3 flex justify-center">
                          <div className="flex gap-3 items-center">
                            <Link to={`/editVersion/${v._id}`}>
                              <button>Edit</button>
                            </Link>
                            <button onClick={() => deleteVersionControl(v._id)}>
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
        </div>
      </div>
    </div>
  );
};

export default RiskVersionControls;
