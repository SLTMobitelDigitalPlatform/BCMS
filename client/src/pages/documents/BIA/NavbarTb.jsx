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

      <Link to="/documentControl">
        <button className="border-2 border-blue-800 text-blue-500 px-4 py-2 rounded-full hover:bg-blue-500 hover:text-white transition">
          Document Version
        </button>
      </Link>

      <Link to="/dependancies">
        <button className="border-2 border-blue-800 text-blue-500 px-4 py-2 rounded-full hover:bg-blue-500 hover:text-white transition">
          Operating Sites
        </button>
      </Link>

      <Link to="/table">
        <button className="border-2 border-blue-800 text-blue-500 px-4 py-2 rounded-full hover:bg-blue-500 hover:text-white transition">
          Critical BUsiness Function
        </button>
      </Link>

      <Link to="/business-peaks-and-deadlines">
        <button className="border-2 border-blue-800 text-blue-500 px-4 py-2 rounded-full hover:bg-blue-500 hover:text-white transition">
          Business Peaks and Deadlines
        </button>
      </Link>

      <Link to="/critical-business-function">
        <button className="border-2 border-blue-800 text-blue-500 px-4 py-2 rounded-full hover:bg-blue-500 hover:text-white transition">
          Resources
        </button>
      </Link>



    </div>
  );
};

export default Navbar;
