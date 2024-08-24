import Title from "../../../../components/Title";
import ContextNavigation from "../../../../components/ContextNavigation";
import Sidebar from "../../../../components/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
    <div className="container mx-auto py-8">
      <div className="flex gap-x-10">
        <Sidebar />
        <div>
          <div className=" border-2 w-[76vw] h-[575px] rounded-2xl ml-1 mr-45 mt-1 p-5">
            <Title />
            <div className="bg-sky-50 p-5 mt-8 rounded-xl">
              <ContextNavigation />
              <div className="flex justify-between items-center mt-8">
                <h1 className="text-2xl font-bold text-blue-900">
                  Master List of Procedures / Process
                </h1>
                <Link to="/createMasterProducers">
                  <button className="px-3 py-1 bg-[#52B14A] text-white font-semibold rounded-lg">
                    Add Details
                  </button>
                </Link>
              </div>
              <div className="mt-8">
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
                        <td className="border-2 p-3">
                          {masterProd.processName}
                        </td>
                        <td className="border-2 p-3">
                          {masterProd.processKpi}
                        </td>
                        <td className="border-2 p-3">
                          {masterProd.responsiblePerson}
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

export default MasterProcedures;
