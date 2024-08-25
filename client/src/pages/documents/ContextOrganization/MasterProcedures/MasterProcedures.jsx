import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ContextNavigation from "../../../../components/ContextNavigation";

const MasterProcedures = () => {
  const [masterProducers, setMasterProducers] = useState([]);

  const fetchMasterProducers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/proceduresAndProdess"
      );
      setMasterProducers(response.data);
    } catch (error) {
      confirm.log(error);
    }
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
            </tr>
          </thead>
          <tbody>
            {masterProducers.map((masterProd) => (
              <tr key={masterProd.processNo}>
                <td className="border-2 p-3">{masterProd.processNo}</td>
                <td className="border-2 p-3">{masterProd.processName}</td>
                <td className="border-2 p-3">{masterProd.processKpi}</td>
                <td className="border-2 p-3">{masterProd.responsiblePerson}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MasterProcedures;
