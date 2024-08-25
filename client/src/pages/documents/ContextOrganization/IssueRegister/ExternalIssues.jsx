import { Link } from "react-router-dom";
import ContextNavigation from "../../../../components/ContextNavigation";

import axios from "axios";
import { useEffect, useState } from "react";

const ExternalIssues = () => {
  const [externalIssues, setExternalIssues] = useState([]);

  const fetchExternalIssues = async () => {
    try {
      const response = await axios.get("http://localhost:5000/externalIssues");
      setExternalIssues(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchExternalIssues();
  }, []);

  return (
    <div className="w-full h-full p-5 flex flex-col bg-sky-100 rounded-2xl">
      <h1 className="text-3xl mb-5 font-bold text-green-500">
        Context Of The Organization
      </h1>
      <ContextNavigation />
      {/* <div className="bg-sky-50 w-full h-full p-5 mt-8 rounded-2xl"> */}
      <div className="flex justify-between items-center mt-10">
        <div className="flex items-center gap-10">
          <h1 className="text-2xl font-bold text-blue-900">Issue Register</h1>
          <Link to="/internalIssues">
            <button className="px-3 py-1 border-2 border-sky-600 text-sky-600 hover:text-[#52B14A] hover:border-[#52B14A] font-semibold rounded-lg">
              Internal Issues
            </button>
          </Link>
          <Link to="/externalIssues">
            <button className="px-3 py-1 border-2 border-sky-600 text-sky-600 hover:text-[#52B14A] hover:border-[#52B14A] font-semibold rounded-lg">
              External Issues
            </button>
          </Link>
        </div>
        <Link to="/createExternalIssue">
          <button className="px-3 py-1 bg-[#52B14A] text-white font-semibold rounded-lg">
            Create Record
          </button>{" "}
        </Link>
      </div>
      <div className="mt-5">
        <h1 className="text-center text-2xl font-bold mb-3">External Issues</h1>
      </div>

      {/* Table */}
      <div className="mt-10 w-full h-full overflow-auto">
        <table className="w-full border-2">
          <thead>
            <tr className="border-2">
              <th className="border-2">External Issues</th>
              <th className="border-2">Requirments</th>
              <th className="border-2">ISMS</th>
              <th className="border-2">QMS</th>
              <th className="border-2">BCMS</th>
            </tr>
          </thead>
          <tbody>
            {externalIssues.map((external) => (
              <tr key={external._id}>
                <td className="border-2 p-3">{external.externalIssues}</td>
                <td className="border-2 p-3">{external.requirments}</td>
                <td className="border-2 p-3">{external.isms ? "✓" : "✗"}</td>
                <td className="border-2 p-3">{external.qms ? "✓" : "✗"}</td>
                <td className="border-2 p-3">{external.bcms ? "✓" : "✗"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* </div> */}
    </div>
    // </div>
  );
};

export default ExternalIssues;
