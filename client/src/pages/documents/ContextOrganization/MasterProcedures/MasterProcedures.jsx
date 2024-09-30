import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
    <div className="pt-5 w-full h-full flex flex-col">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-xl font-bold text-indigo-900">
          Master List of Procedures/Process
        </h1>
        <Link to="/createMasterProducers" className="btn-primary">
          Add Details
        </Link>
      </div>

      {/* Table */}
      <div className="h-full w-full overflow-auto">
        <table className="table-fixed w-full">
          <thead className="sticky top-0 bg-indigo-200">
            <tr>
              <th className="w-24 doc-table-head">Process No</th>
              <th className="doc-table-head">Process Name</th>
              <th className="doc-table-head">Process KPI</th>
              <th className="doc-table-head">Process Owner</th>
              <th className="w-36 doc-table-head">Actions</th>
            </tr>
          </thead>
          <tbody>
            {masterProducers.map((masterProd) => (
              <tr key={masterProd.processNo} className="doc-table-hover">
                <td className="py-2 px-4 w-24 text-center doc-table-data">
                  {masterProd.processNo}
                </td>
                <td className="py-2 px-4 doc-table-data">
                  {masterProd.processName}
                </td>
                <td className="py-2 px-4 doc-table-data">
                  {masterProd.processKpi}
                </td>
                <td className="py-2 px-4 doc-table-data">
                  {masterProd.responsiblePerson.name}
                </td>
                <td className="py-2 px-4 w-36 doc-table-data">
                  <div className="flex justify-center gap-2">
                    <Link
                      to={`/editMasterProcedures/${masterProd._id}`}
                      className="doc-edit-btn"
                    >
                      Edit
                    </Link>
                    <button
                      className="doc-delete-btn"
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
