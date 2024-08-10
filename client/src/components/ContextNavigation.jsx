import React from "react";
import { Link } from "react-router-dom";

const ContextNavigation = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <Link to="/versionControls">
          <button className="px-3 py-1 border-2 border-sky-600 text-sky-600 hover:text-[#52B14A] hover:border-[#52B14A] font-semibold rounded-lg">
            Version Control
          </button>
        </Link>
        <button className="px-3 py-1 border-2 border-sky-600 text-sky-600 hover:text-[#52B14A] hover:border-[#52B14A] font-semibold rounded-lg">
          Interested Parties
        </button>
        <Link to="/internalIssues">
          <button className="px-3 py-1 border-2 border-sky-600 text-sky-600 hover:text-[#52B14A] hover:border-[#52B14A] font-semibold rounded-lg">
            Issue Register
          </button>
        </Link>
        <Link to="/interfaces">
          <button className="px-3 py-1 border-2 border-sky-600 text-sky-600 hover:text-[#52B14A] hover:border-[#52B14A] font-semibold rounded-lg">
            Interfaces and Dependencies
          </button>
        </Link>
        <Link to="/objectives">
          <button className="px-3 py-1 border-2 border-sky-600 text-sky-600 hover:text-[#52B14A] hover:border-[#52B14A] font-semibold rounded-lg">
            Objectives
          </button>
        </Link>
        <Link to="/masterProcedures">
          <button className="px-3 py-1 border-2 border-sky-600 text-sky-600 hover:text-[#52B14A] hover:border-[#52B14A] font-semibold rounded-lg">
            Master of Procedures and Process
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ContextNavigation;
