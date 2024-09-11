import React from 'react';
import BIANavigation from "../../../components/BIANavigation";

const ResourcesRequired = () => {
  return (
    <div className="flex h-screen">
   

      {/* Main Content */}
      <div className="resources-container w-full h-full bg-sky-100 flex flex-col rounded-2xl pt-5 p-6 overflow-y-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-blue-900">Resources Required</h1>
        </header>

        {/* Table - Resources Required */}
        <div className="resources-content mt-6 px-5">
          
          <div className="table-container bg-white rounded-xl p-5 shadow-md overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2 bg-gray-100">Name</th>
                  <th className="border p-2 bg-gray-100">30 Min</th>
                  <th className="border p-2 bg-gray-100">1 Hour</th>
                  <th className="border p-2 bg-gray-100">2 Hours</th>
                  <th className="border p-2 bg-gray-100">4 Hours</th>
                  <th className="border p-2 bg-gray-100">6 Hours</th>
                  <th className="border p-2 bg-gray-100">8 Hours</th>
                  <th className="border p-2 bg-gray-100">12 Hours</th>
                  <th className="border p-2 bg-gray-100">1 Day</th>
                  <th className="border p-2 bg-gray-100">3 Days</th>
                  <th className="border p-2 bg-gray-100">7 Days</th>
                  <th className="border p-2 bg-gray-100">2 Weeks</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2">Example 1</td>
                  <td className="border p-2"></td>
                  <td className="border p-2"></td>
                  <td className="border p-2"></td>
                  <td className="border p-2"></td>
                  <td className="border p-2"></td>
                  <td className="border p-2"></td>
                  <td className="border p-2"></td>
                  <td className="border p-2"></td>
                  <td className="border p-2"></td>
                  <td className="border p-2"></td>
                  <td className="border p-2"></td>
                </tr>
                {/* Add more rows as needed */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sidebar Component
const Sidebar = () => (
  <div className="sidebar bg-blue-900 text-white w-60 p-5 h-screen">
    <div className="logo mb-10">
      <img src="logo.png" alt="Logo" />
    </div>
    <nav className="nav flex flex-col gap-3">
      <a href="#" className="font-semibold">Employee</a>
      <a href="#" className="font-semibold">Documents</a>
      <a href="#" className="font-semibold">Meetings</a>
      <a href="#" className="font-semibold">Calendar</a>
      <a href="#" className="font-semibold">Risk Management</a>
      <a href="#" className="font-semibold">Roles & Responsibilities</a>
    </nav>
    <button className="bg-cyan-600 text-white p-2 mt-10 rounded">Log Out</button>
  </div>
);

export default ResourcesRequired;
