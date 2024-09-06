import React from "react";
import Navbar from "./NavbarTb";

const EmDoc = () => {
  return (
    <div className="p-6">
      <Navbar />
      <div className="p-4 bg-blue-50 rounded-xl shadow-lg">
        <h2 className="text-lg font-semibold text-[#52B14A]  mb-4">
          Embedded List/Grab List
        </h2>
        <div className="flex justify-end">
          <button className="mt-1 px-6 py-3 bg-gradient-to-r from-[#003E81] to-[#52B14A] text-white rounded-full shadow-md">
            Add Details
          </button>
        </div>
        <br />
        <table className="min-w-full bg-white border border-blue-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b-2 border-blue-200 bg-blue-100 text-left">
                No
              </th>
              <th className="px-4 py-2 border-b-2 border-blue-200 bg-blue-100 text-left">
                Description of Item
              </th>
              <th className="px-4 py-2 border-b-2 border-blue-200 bg-blue-100 text-left">
                Person Responsible
              </th>
              <th className="px-4 py-2 border-b-2 border-blue-200 bg-blue-100 text-left">
                Physical Location of Item
              </th>
              <th className="px-4 py-2 border-b-2 border-blue-200 bg-blue-100 text-left">
                Owner
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                no: "E005",
                description: "Gihan Chamara",
                person: "Gihan Chamara",
                location: "",
                owner: "",
              },
              {
                no: "E006",
                description: "Item 2",
                person: "Person 2",
                location: "Location 2",
                owner: "Owner 2",
              },
              {
                no: "E007",
                description: "Item 3",
                person: "Person 3",
                location: "Location 3",
                owner: "Owner 3",
              },
            ].map((item, index) => (
              <tr key={index} className="hover:bg-blue-50">
                <td className="px-4 py-2 border border-blue-200">{item.no}</td>
                <td className="px-4 py-2 border border-blue-200">
                  {item.description}
                </td>
                <td className="px-4 py-2 border border-blue-200">
                  <select className="w-full rounded-md border-blue-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                    <option>{item.person}</option>
                  </select>
                </td>
                <td className="px-4 py-2 border border-blue-200">
                  {item.location}
                </td>
                <td className="px-4 py-2 border border-blue-200">
                  {item.owner}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmDoc;
