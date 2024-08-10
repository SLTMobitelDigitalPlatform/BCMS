import React from "react";
import { FaSearch, FaUserCircle } from "react-icons/fa"; // Ensure you have react-icons installed
import logo from "../assets/SLTLogo.png";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-2 bg-white ">
      {/* Logo */}
      <div className="flex items-center space-x-2 ml-4 mt-2">
        <img src={logo} alt="Logo" className="h-16" />
      </div>

      {/* Navigation Links */}
      <div className="flex-1 flex justify-center space-x-8">
        <a href="/" className="text-black hover:text-blue-600 font-bold">
          Home
        </a>
        <a href="/about" className="text-black hover:text-blue-600 font-bold">
          About
        </a>
        <a
          href="/services"
          className="text-black hover:text-blue-600 font-bold"
        >
          Services
        </a>
        <a href="/contact" className="text-black hover:text-blue-600 font-bold">
          Contact
        </a>
      </div>

      {/* User Icon */}
      <div className="flex items-center mr-8">
        <FaUserCircle className="text-black h-10 w-10" />
      </div>
    </nav>
  );
};

export default Navbar;
