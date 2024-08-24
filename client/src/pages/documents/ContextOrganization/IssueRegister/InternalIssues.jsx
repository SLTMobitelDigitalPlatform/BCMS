import Title from "../../../../components/Title";
import ContextNavigation from "../../../../components/ContextNavigation";
import { Link } from "react-router-dom";
import Sidebar from "../../../../components/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";

const InternalIssues = () => {
  const [internalIssues, setInternalIssues] = useState([]);

  const fetchInternalIssues = async () => {
    try {
      const response = await axios.get("http://localhost:5000/internalIssues");
      setInternalIssues(response.data);
      // console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchInternalIssues();
  }, []);
  return (
    <div className="container mx-auto py-8">
      <div className="flex gap-x-10">
        <Sidebar />
        <div>
          <div className=" border-2 w-[76vw] h-[575px] rounded-2xl ml-2 mr-45 mt-1 p-5">
            <Title />
            <div className="bg-sky-50 p-5 mt-8 rounded-xl">
              <ContextNavigation />
              <div className="flex justify-between items-center mt-8">
                <div className="flex items-center gap-10">
                  <h1 className="text-2xl font-bold text-blue-900">
                    Issue Register
                  </h1>
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
                <Link to="/createInternalIssue">
                  <button className="px-3 py-1 bg-[#52B14A] text-white font-semibold rounded-lg">
                    Create Record
                  </button>
                </Link>
              </div>
              <div className="mt-5">
                <h1 className="text-center text-2xl font-bold mb-3">
                  Internal Issues
                </h1>
                <table className="w-full border-2">
                  <thead>
                    <tr className="border-2">
                      <th className="border-2">Internal Issues</th>
                      <th className="border-2">Requirments</th>
                      <th className="border-2">ISMS</th>
                      <th className="border-2">QMS</th>
                      <th className="border-2">BCMS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {internalIssues.map((internal) => (
                      <tr key={internal._id}>
                        <td className="border-2 p-3">
                          {internal.internalIssues}
                        </td>
                        <td className="border-2 p-3">{internal.requirments}</td>
                        <td className="border-2 p-3">
                          {internal.isms ? "✓" : "✗"}
                        </td>
                        <td className="border-2 p-3">
                          {internal.qms ? "✓" : "✗"}
                        </td>
                        <td className="border-2 p-3">
                          {internal.bcms ? "✓" : "✗"}
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

export default InternalIssues;
