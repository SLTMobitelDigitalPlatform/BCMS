import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import BIANavigation from "../../../components/BIANavigation";

const BiaCriticalBusinessFunctions = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar Navigation */}
      <BIANavigation />

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-green-600">
            Business Impact Analysis
          </h1>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search"
              className="border border-gray-300 rounded-md p-2"
            />
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg">
              + Add
            </button>
          </div>
        </header>

        {/* Navigation Tabs */}
        <div className="flex space-x-4 mb-6">
          <button className="px-4 py-2 bg-white rounded-lg shadow">
            BIA Form
          </button>
          <button className="px-4 py-2 bg-white rounded-lg shadow">
            Document Versions
          </button>
          <button className="px-4 py-2 bg-white rounded-lg shadow">
            Operating Sites
          </button>
          <button className="px-4 py-2 bg-white rounded-lg shadow">
            Critical Business Functions
          </button>
          <button className="px-4 py-2 bg-white rounded-lg shadow">
            Business Peaks and Deadlines
          </button>
          <button className="px-4 py-2 bg-white rounded-lg shadow">
            Resources
          </button>
        </div>

        {/* Critical Business Functions Table */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-center mb-6">
            Critical Business Functions
          </h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-green-100">
                <th className="border p-2">Critical Business Function</th>
                <th className="border p-2">Description</th>
                <th className="border p-2">Criticality</th>
                <th className="border p-2">RTO</th>
                <th className="border p-2">RPO</th>
                <th className="border p-2">MTPD</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">aaaaa</td>
                <td className="border p-2"></td>
                <td className="border p-2"></td>
                <td className="border p-2"></td>
                <td className="border p-2"></td>
                <td className="border p-2"></td>
              </tr>
              <tr>
                <td className="border p-2">bbbbb</td>
                <td className="border p-2"></td>
                <td className="border p-2"></td>
                <td className="border p-2"></td>
                <td className="border p-2"></td>
                <td className="border p-2"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BiaCriticalBusinessFunctions;
