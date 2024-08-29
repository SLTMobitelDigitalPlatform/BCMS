import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import RiskAssNavigation from "../../../../components/RiskAssNavigation";

const RiskVersionControls = () => {
  const [versionControls, setVersionControls] = useState([]);

  const fetchVersionControls = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/versionControlsRisks/"
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
    <div className="w-full h-full flex flex-col">
      <h1 className="text-3xl mb-5 font-bold text-green-500">
        Risk Management
      </h1>
      <RiskAssNavigation />
      <div className="bg-sky-50 rounded-2xl h-full mt-5 p-5">
        <div className="flex justify-between items-center ">
          <h1 className="text-2xl font-bold text-blue-900">Version Control</h1>
          <Link to="/createRiskVersion">
            <button className="btn-primary">Create Version Control</button>
          </Link>
        </div>
        {/* <div className="flex justify-between items-center mt-8">
        </div> */}

        {/* Table */}
        <div className="mt-8 h-full overflow-auto">
          <table className="w-full border-2">
            <thead>
              <tr className="border-2">
                <th className="border-2">Serial Number</th>
                <th className="border-2">Version Number</th>
                <th className="border-2">Prepared By</th>
                <th className="border-2">Approved By</th>
                <th className="border-2">Reasons for new release</th>
                <th className="border-2">Approval Status</th>
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
                  <td className="border-2 p-3">{v.isApproved}</td>
                  <td className="border-2 p-3 flex justify-center">
                    <div className="flex gap-3 items-center">
                      <Link to={`/editISRiskVersion/${v._id}`}>
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
  );
};

export default RiskVersionControls;
