import React from "react";
import ContextNavigation from "../../../../components/ContextNavigation";
import Title from "../../../../components/Title";
import Sidebar from "../../../../components/Sidebar";

const InterfacesDependencies = () => {
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
                <h1 className="text-2xl font-bold text-blue-900">
                  Interfaces and Dependencies
                </h1>
                <button className="px-3 py-1 bg-[#52B14A] text-white font-semibold rounded-lg">
                  Add Details
                </button>
              </div>
              <div className="mt-8">
                <table className="w-full border-2">
                  <thead>
                    <tr className="border-2">
                      <th className="border-2 px-2">Process Name</th>
                      <th className="border-2 px-2">External entity name</th>
                      <th className="border-2 px-2">information Exchanged</th>
                      <th className="border-2 px-2">Inworld/Outworld</th>
                      <th className="border-2 px-2">Medium</th>
                      <th className="border-2 px-2">Exchange method</th>
                      <th className="border-2 px-2">
                        Service provided/obtained
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border-2 p-3">a</td>
                      <td className="border-2 p-3">b</td>
                      <td className="border-2 p-3">c</td>
                      <td className="border-2 p-3">d</td>
                      <td className="border-2 p-3">e</td>
                      <td className="border-2 p-3">f</td>
                      <td className="border-2 p-3">g</td>
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

export default InterfacesDependencies;
