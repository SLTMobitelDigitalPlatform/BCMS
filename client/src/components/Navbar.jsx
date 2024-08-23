import { FaUserCircle } from "react-icons/fa"; // Ensure you have react-icons installed
import logo from "../assets/SLTLogo.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/currentuser", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const fullImageUrl = `http://localhost:5000${response.data.profileImg}`;
        setUser(response.data);
        setPreviewUrl(fullImageUrl); // Set the initial previewUrl
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);
  return (
    <nav className="flex items-center justify-between p-2 bg-white ">
      {/* Logo */}
      <div className="flex items-center space-x-2 ml-4">
        <img src={logo} alt="Logo" className="w-32 h-auto" />
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
      {previewUrl ? (
        <div className="flex items-center mr-8">
          <Link to="/profile">
            <img
              src={previewUrl} // Directly use the base64 data URL
              alt="Profile"
              className="text-black h-10 w-10 rounded-full"
            />
          </Link>
        </div>
      ) : (
        <div className="flex items-center mr-8">
          <Link to="/profile">
            <FaUserCircle className="text-black h-10 w-10" />
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
