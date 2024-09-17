import React from "react";
import { useNavigate } from "react-router-dom";
import BIANavigation from "../../../components/BIANavigation";

const ImpactAnalysis = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen overflow-hidden">
    
      
      {/* Impact Analysis Container */}
      <div className="impact-analysis-container flex-1 bg-sky-100 flex flex-col rounded-2xl pt-5 p-6 overflow-y-auto"> 
     
        <div className="impact-analysis-content mt-6 px-5">
          
          {/* Severity Level - Operational */}
          <div className="severity-level-table bg-white rounded-xl p-5 shadow-md">
            <h3 className="text-lg font-semibold mb-4">
              Severity Level - Operational
            </h3>
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2 bg-gray-100 text-left">
                    Severity Level
                  </th>
                  <th className="border p-2 bg-gray-100 text-left">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2 bg-green-500">Insignificant</td>
                  <td className="border p-2">Some inconveniences caused but without any short or long term negative consequences</td>
                </tr>
                <tr>
                  <td className="border p-2 bg-yellow-500">Minor</td>
                  <td className="border p-2">No impacts or impact is negligible</td>
                </tr>
                <tr>
                  <td className="border p-2 bg-orange-500">Moderate</td>
                  <td className="border p-2">Inconveniences caused: short term negative consequences but without serious long term damage</td>
                </tr>
                <tr>
                  <td className="border p-2 bg-red-500">Major</td>
                  <td className="border p-2">Serious long term damage likely; will become catastrophic if impact is not contained</td>
                </tr>
                <tr>
                  <td className="border p-2 bg-black text-white">Severe</td>
                  <td className="border p-2">
                    Irreparable damage to organization
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          {/* Severity Level - Financial */}
          <div className="severity-level-table bg-white rounded-xl p-5 shadow-md mt-6">
            <h3 className="text-lg font-semibold mb-4">
              Severity Level - Financial
            </h3>
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2 bg-gray-100 text-left">
                    Severity Level
                  </th>
                  <th className="border p-2 bg-gray-100 text-left">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2 bg-green-500">&lt; Rs.1M</td>
                  <td className="border p-2">Revenue Loss from 0 to less than Rs.1M</td>
                </tr>
                <tr>
                  <td className="border p-2 bg-yellow-500">Rs.1M - 10M</td>
                  <td className="border p-2">Revenue Loss from Rs.1M to Rs.10M</td>
                </tr>
                <tr>
                  <td className="border p-2 bg-orange-500">Rs.10M - 100M</td>
                  <td className="border p-2">Revenue Loss from Rs.10M to Rs.100M</td>
                </tr>
                <tr>
                  <td className="border p-2 bg-red-500">Rs.100M - 500M</td>
                  <td className="border p-2">Revenue Loss from Rs.100M to Rs.500M</td>
                </tr>
                <tr>
                  <td className="border p-2 bg-black text-white">
                    &gt; Rs.500M
                  </td>
                  <td className="border p-2">
                    Revenue Loss greater than Rs.500M
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sidebar Component
const Sidebar = () => (
  <div className="sidebar bg-blue-900 text-white w-60 p-5 h-screen">
    <div className="logo mb-10">
      <img src="logo.png" alt="Logo" />
    </div>
    <nav className="nav flex flex-col gap-3">
      <a href="#" className="font-semibold">
        Employee
      </a>
      <a href="#" className="font-semibold">
        Documents
      </a>
      <a href="#" className="font-semibold">
        Meetings
      </a>
      <a href="#" className="font-semibold">
        Calendar
      </a>
      <a href="#" className="font-semibold">
        Risk Management
      </a>
      <a href="#" className="font-semibold">
        Roles & Responsibilities
      </a>
    </nav>
    <button className="bg-cyan-600 text-white p-2 mt-10 rounded">
      Log Out
    </button>
  </div>
);

export default ImpactAnalysis;
