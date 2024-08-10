import React from "react";
import Title from "../../../../components/Title";
import ContextNavigation from "../../../../components/ContextNavigation";

const MasterProcedures = () => {
  return (
    <div>
      <div className=" border-2 w-[76vw] h-[575px] rounded-2xl ml-[340px] mr-[18px] mt-20 p-5">
        <Title />
        <div className="bg-sky-50 p-5 mt-8 rounded-xl">
          <ContextNavigation />
          <div className="flex justify-between items-center mt-8">
            <h1 className="text-2xl font-bold text-blue-900">
              Master List of Procedures / Process
            </h1>
            <button className="px-3 py-1 bg-[#52B14A] text-white font-semibold rounded-lg">
              Add Details
            </button>
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
                <tr>
                  <td className="border-2 p-3">a</td>
                  <td className="border-2 p-3">b</td>
                  <td className="border-2 p-3">c</td>
                  <td className="border-2 p-3">d</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasterProcedures;
