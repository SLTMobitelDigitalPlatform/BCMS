import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ContextNavigation from "../../../../components/ContextNavigation";
import Swal from "sweetalert2";

const MasterProcedures = () => {
  const [masterProducers, setMasterProducers] = useState([]);

  const fetchMasterProducers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/proceduresAndProcess"
      );
      setMasterProducers(response.data);
    } catch (error) {
      confirm.log(error);
    }
  };

  const deleteMasterProcess = async (id) => {
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
            `http://localhost:5000/proceduresAndProcess/delete/${id}`
          );
          setMasterProducers(
            masterProducers.filter((masterProd) => masterProd._id !== id)
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

  useEffect(() => {
    fetchMasterProducers();
  }, []);
  return (
    <div className="w-full h-full p-5 flex flex-col bg-sky-100 rounded-2xl">
      <h1 className="text-3xl mb-5 font-bold text-green-500">
        Context Of The Organization
      </h1>
      <ContextNavigation />

      {/* <div className="bg-sky-50 p-5 mt-8 rounded-xl"> */}
      <div className="flex justify-between items-center mt-10">
        <h1 className="text-2xl font-bold text-blue-900">
          Master List of Procedures / Process
        </h1>
        <Link to="/createMasterProducers">
          <button className="px-3 py-1 bg-[#52B14A] text-white font-semibold rounded-lg">
            Add Details
          </button>
        </Link>
      </div>

      {/* Table */}
      <div className="mt-10 h-full overflow-auto">
        <table className="w-full border-2">
          <thead>
            <tr className="border-2">
              <th className="border-2">Process No</th>
              <th className="border-2">Process Name</th>
              <th className="border-2">Process KPI</th>
              <th className="border-2">Process Owner</th>
              <th className="border-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {masterProducers.map((masterProd) => (
              <tr key={masterProd.processNo}>
                <td className="border-2 p-3">{masterProd.processNo}</td>
                <td className="border-2 p-3">{masterProd.processName}</td>
                <td className="border-2 p-3">{masterProd.processKpi}</td>
                <td className="border-2 p-3">{masterProd.responsiblePerson}</td>
                <td className="border-2 p-3 flex justify-center">
                  <div className="flex gap-3 items-center">
                    <Link to={`/editMasterProcedures/${masterProd._id}`}>
                      <button className="p-1 w-20 bg-sky-600 text-white rounded-lg font-semibold">
                        Edit
                      </button>
                    </Link>
                    <button
                      className="p-1 w-20 bg-red-500 text-white rounded-lg"
                      onClick={() => deleteMasterProcess(masterProd._id)}
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

export default MasterProcedures;
