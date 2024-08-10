import React from "react";
import Title from "../../../../components/Title";
import ContextNavigation from "../../../../components/ContextNavigation";
import { Link } from "react-router-dom";

const InternalIssues = () => {
  return (
    <div>
      <div className=" border-2 w-[76vw] h-[575px] rounded-2xl ml-[340px] mr-[18px] mt-20 p-5">
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
            <button className="px-3 py-1 bg-[#52B14A] text-white font-semibold rounded-lg">
              Create Record
            </button>
          </div>
          <div className="mt-5">
            <h1 className="text-center text-2xl font-bold mb-3">
              Internal Issues
            </h1>
            <table className="w-full border-2">
              <thead>
                <tr className="border-2">
                  <th className="border-2">Serial Number</th>
                  <th className="border-2">Version Number</th>
                  <th className="border-2">Prepared By</th>
                  <th className="border-2">Approved By</th>
                  <th className="border-2">Reasons for new release</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border-2 p-3">a</td>
                  <td className="border-2 p-3">b</td>
                  <td className="border-2 p-3">c</td>
                  <td className="border-2 p-3">d</td>
                  <td className="border-2 p-3">e</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternalIssues;
