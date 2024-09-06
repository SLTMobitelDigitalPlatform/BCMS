// Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex space-x-4 mb-6">
      <Link to="/bcp">
        <button className="border-2 border-blue-800 text-blue-500 px-4 py-2 rounded-full hover:bg-blue-500 hover:text-white transition">
          BCP Form
        </button>
      </Link>
      <Link to="/documentControl">
        <button className="border-2 border-blue-800 text-blue-500 px-4 py-2 rounded-full hover:bg-blue-500 hover:text-white transition">
          Document Control
        </button>
      </Link>
      <Link to="/dependancies">
        <button className="border-2 border-blue-800 text-blue-500 px-4 py-2 rounded-full hover:bg-blue-500 hover:text-white transition">
          Dependencies
        </button>
      </Link>
      <Link to="/table">
        <button className="border-2 border-blue-800 text-blue-500 px-4 py-2 rounded-full hover:bg-blue-500 hover:text-white transition">
          Legal Requirements
        </button>
      </Link>
      <Link to="/emdoc">
        {" "}
        {/* Update this line */}
        <button className="border-2 border-blue-800 text-blue-500 px-4 py-2 rounded-full hover:bg-blue-500 hover:text-white transition">
          Embedded Documents
        </button>
      </Link>
      <Link to="/critical-business-function">
        <button className="border-2 border-blue-800 text-blue-500 px-4 py-2 rounded-full hover:bg-blue-500 hover:text-white transition">
          Critical Business Function
        </button>
      </Link>
    </div>
  );
};

export default Navbar;
