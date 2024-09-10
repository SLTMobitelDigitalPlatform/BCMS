// Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {

  return (
    <div className="flex space-x-4 mb-6">

      <Link to="/bia-form">
        <button className="border-2 border-blue-800 text-blue-500 px-4 py-2 rounded-full hover:bg-blue-500 hover:text-white transition">
          BIA Form
        </button>
      </Link>

      <Link to="/document-version">
        <button className="border-2 border-blue-800 text-blue-500 px-4 py-2 rounded-full hover:bg-blue-500 hover:text-white transition">
          Document Version
        </button>
      </Link>

      <Link to="/operating-sites">
        <button className="border-2 border-blue-800 text-blue-500 px-4 py-2 rounded-full hover:bg-blue-500 hover:text-white transition">
          Operating Sites
        </button>
      </Link>

      <Link to="/critical-business-function">
        <button className="border-2 border-blue-800 text-blue-500 px-4 py-2 rounded-full hover:bg-blue-500 hover:text-white transition">
          Critical BUsiness Function
        </button>
      </Link>

      <Link to="/business-peaks-and-deadlines">
        <button className="border-2 border-blue-800 text-blue-500 px-4 py-2 rounded-full hover:bg-blue-500 hover:text-white transition">
          Business Peaks and Deadlines
        </button>
      </Link>

      <Link to="/resources">
        <button className="border-2 border-blue-800 text-blue-500 px-4 py-2 rounded-full hover:bg-blue-500 hover:text-white transition">
          Resources
        </button>
      </Link>

      <Link to="/impact-analysis">
        <button className="border-2 border-blue-800 text-blue-500 px-4 py-2 rounded-full hover:bg-blue-500 hover:text-white transition">
          Impact Analysis
        </button>
      </Link>

      <Link to="/resources-required">
        <button className="border-2 border-blue-800 text-blue-500 px-4 py-2 rounded-full hover:bg-blue-500 hover:text-white transition">
          Resources Required
        </button>
      </Link>

      <Link to="/dependencies">
        <button className="border-2 border-blue-800 text-blue-500 px-4 py-2 rounded-full hover:bg-blue-500 hover:text-white transition">
          Dependencies
        </button>
      </Link>

      <Link to="/work-area-recovery">
        <button className="border-2 border-blue-800 text-blue-500 px-4 py-2 rounded-full hover:bg-blue-500 hover:text-white transition">
          Work Area Recovery
        </button>
      </Link>

      <Link to="/manpower">
        <button className="border-2 border-blue-800 text-blue-500 px-4 py-2 rounded-full hover:bg-blue-500 hover:text-white transition">
          Manpower
        </button>
      </Link>

    </div>
  );
};

export default Navbar;
