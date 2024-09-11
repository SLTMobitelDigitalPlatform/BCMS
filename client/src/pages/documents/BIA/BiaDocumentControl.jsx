import React from 'react';
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import BIANavigation from "../../../components/BIANavigation";

const BiaDocumentControl = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
    

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-blue-900">Document Control</h1>
        </header>        

        {/* Document Control Table */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-center mb-6">Document Control</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-blue-100">
                <th className="border p-2">Version</th>
                <th className="border p-2">Description</th>
                <th className="border p-2">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">1.0</td>
                <td className="border p-2">Initial Version</td>
                <td className="border p-2">10 Oct 2016</td>
              </tr>
              <tr>
                <td className="border p-2">2.0</td>
                <td className="border p-2">2018 review</td>
                <td className="border p-2">22 May 2018</td>
              </tr>
              <tr>
                <td className="border p-2">3.0</td>
                <td className="border p-2">2019 review</td>
                <td className="border p-2">20 May 2019</td>
              </tr>
              <tr>
                <td className="border p-2">4.0</td>
                <td className="border p-2">2020 review</td>
                <td className="border p-2">21 Aug 2020</td>
              </tr>
              <tr>
                <td className="border p-2">5.0</td>
                <td className="border p-2">2021 review</td>
                <td className="border p-2">22 Aug 2021</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BiaDocumentControl;
