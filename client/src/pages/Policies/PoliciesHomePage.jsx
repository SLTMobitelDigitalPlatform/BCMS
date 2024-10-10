import React from "react";
import { FaBuilding, FaBuildingUser, FaPeopleGroup } from "react-icons/fa6";
import { Link } from "react-router-dom";

const PoliciesHomePage = () => {
  return (
    <div className="px-5">
      <h1 className="topic mb-5">Organizational Communication </h1>

      <div className="flex justify-center gap-20 mt-40 text-white">
        <Link
          to="/policies"
          className="flex flex-col justify-center items-center bg-indigo-800 hover:bg-indigo-900 border-2 border-indigo-800 rounded-xl w-60 h-60 space-y-5"
        >
          <FaPeopleGroup className="w-20 h-20" />
          <h1 className="text-lg font-semibold m-5">
            Organizational Policies & Guidelines
          </h1>
        </Link>
        <Link
          to="/teamsDoc"
          className="flex flex-col justify-center items-center bg-indigo-800 hover:bg-indigo-900 border-2 border-indigo-800 rounded-xl w-60 h-60 space-y-5 "
        >
          <FaBuildingUser className="w-20 h-20 m-1" />
          <h1 className="text-lg font-semibold ">Teams Related Documents</h1>
        </Link>
        <Link
          to="/otherDoc"
          className="flex flex-col justify-center items-center bg-indigo-800 hover:bg-indigo-900 border-2 border-indigo-800 rounded-xl w-60 h-60 space-y-5 "
        >
          <FaBuildingUser className="w-20 h-20 m-1" />
          <h1 className="text-lg font-semibold ">Other Documents</h1>
        </Link>
      </div>
    </div>
  );
};

export default PoliciesHomePage;
