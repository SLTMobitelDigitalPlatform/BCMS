import React from "react";
import EmployeeDashboard from "../../components/EmployeeDashboard";
import Welcome from "../../components/Welcome";
import Navbar from "../../components/Navbar";

const EmployeeHomePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex flex-1 flex-col lg:flex-row items-center justify-center bg-sky-50 border rounded-lg border-gray-300 shadow-md p-0 m-6 mt-2 p-2">
        <Welcome />
        <EmployeeDashboard />
      </main>
    </div>
  );
};

export default EmployeeHomePage;
