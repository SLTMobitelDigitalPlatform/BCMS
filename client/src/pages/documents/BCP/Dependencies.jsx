// Dependencies.jsx
import { useState } from "react";

const Dependencies = () => {
  const [activeTab, setActiveTab] = useState("internal");

  return (
    <div className="p-6">
      <div className="p-6 bg-blue-50 rounded-lg shadow-md">
        <div className="flex space-x-4 border-b-2 mb-6">
          <button
            className={`px-6 py-3 rounded-t-md ${
              activeTab === "external"
                ? "border-b-2 border-green-500 text-green-700 bg-white"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("external")}
          >
            External Dependencies
          </button>
          <button
            className={`px-6 py-3 rounded-t-md ${
              activeTab === "internal"
                ? "border-b-2 border-green-500 text-green-700 bg-white"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("internal")}
          >
            Internal Dependencies
          </button>
        </div>

        <div className="p-6 bg-white rounded-md">
          <h2 className="text-[#52B14A] text-xl mb-4">Internal Dependencies</h2>
          <div className="flex items-center justify-between mb-4">
            <span className="font-semibold">
              Select Critical Business Function
            </span>
            <button className="text-xl">&#9660;</button>
          </div>

          <div className="flex space-x-4 mb-4">
            <button className="px-6 py-3 bg-blue-200 text-blue-700 rounded-full shadow-md">
              Upstream
            </button>
            <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-full shadow-md">
              Downstream
            </button>
          </div>
          <div className="flex justify-end">
            <button className="mt-1 px-6 py-3 bg-gradient-to-r from-[#003E81] to-[#52B14A] text-white rounded-full shadow-md">
              Add Details
            </button>
          </div>
          <br></br>
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="text-left bg-blue-100">
                  <th className="px-4 py-2 border">Name of Organization</th>
                  <th className="px-4 py-2 border">For What</th>
                  <th className="px-4 py-2 border">Primary Contact</th>
                  <th className="px-4 py-2 border">Secondary Contact</th>
                  <th className="px-4 py-2 border">RTO</th>
                  <th className="px-4 py-2 border">Justifications</th>
                  <th className="px-4 py-2 border">Options</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border">SLT-Galle HQ</td>
                  <td className="px-4 py-2 border"></td>
                  <td className="px-4 py-2 border"></td>
                  <td className="px-4 py-2 border"></td>
                  <td className="px-4 py-2 border"></td>
                  <td className="px-4 py-2 border"></td>
                  <td className="px-4 py-2 border"></td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border">Organization B</td>
                  <td className="px-4 py-2 border"></td>
                  <td className="px-4 py-2 border"></td>
                  <td className="px-4 py-2 border"></td>
                  <td className="px-4 py-2 border"></td>
                  <td className="px-4 py-2 border"></td>
                  <td className="px-4 py-2 border"></td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border">Organization C</td>
                  <td className="px-4 py-2 border"></td>
                  <td className="px-4 py-2 border"></td>
                  <td className="px-4 py-2 border"></td>
                  <td className="px-4 py-2 border"></td>
                  <td className="px-4 py-2 border"></td>
                  <td className="px-4 py-2 border"></td>
                </tr>
                {/* Add more rows as needed */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dependencies;
