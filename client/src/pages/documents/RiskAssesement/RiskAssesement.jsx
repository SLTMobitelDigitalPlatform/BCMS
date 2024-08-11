import React from "react";
import Title from "../../../components/Title";
import ContextNavigation from "../../../components/ContextNavigation";
import Sidebar from "../../../components/Sidebar";

const Objectives = () => {
  return (
    <div className="container mx-auto py-8">
      <div className="flex gap-x-10">
        <Sidebar />
        <div>
          <div className=" border-2 w-[76vw] h-[575px] rounded-2xl ml-2 mr-50 mt-1 p-5">
            <Title />
            <div className="bg-sky-50 p-5 mt-8 rounded-xl">
              <ContextNavigation />
              <div className="flex justify-between items-center mt-8">
                <h1 className="text-2xl font-bold text-blue-900">Objectives</h1>
                <button className="px-3 py-1 bg-[#52B14A] text-white font-semibold rounded-lg">
                  Add Details
                </button>
              </div>
              <div className="mt-8">
                <table className="w-full border-2">
                  <thead>
                    <tr className="border-2">
                      <th className="border-2">Serial Number</th>
                      <th className="border-2">Version Number</th>
                      <th className="border-2">Prepared By</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border-2 p-3">a</td>
                      <td className="border-2 p-3">b</td>
                    </tr>
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

export default Objectives;
