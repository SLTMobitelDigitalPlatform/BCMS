import { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa";
import { RxExclamationTriangle } from "react-icons/rx";
import { TbChevronLeft, TbChevronRight } from "react-icons/tb";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { VscFeedback } from "react-icons/vsc";
import { FiHome } from "react-icons/fi";
import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
import image1 from "../../assets/header/1.jpg";
import image2 from "../../assets/header/2.jpg";
import image3 from "../../assets/header/3.jpg";
import logo from "../../assets/logo.png";
import { useAuth } from "../../auth/AuthContext";

const coverImages = [image1, image2, image3];

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % coverImages.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-x-hidden bg-black">
      <header className="relative w-full h-screen overflow-x-hidden">
        {coverImages.length > 0 ? (
          <img
            src={coverImages[currentImageIndex]}
            alt="Cover"
            className="w-full h-full object-cover opacity-50 transition-opacity duration-1000"
          />
        ) : (
          <p className="text-white">No cover images available</p>
        )}
        {/* Left Arrow */}
        <button
          onClick={() =>
            setCurrentImageIndex(
              (prevIndex) =>
                (prevIndex - 1 + coverImages.length) % coverImages.length
            )
          }
          className="absolute left-4 top-1/2 bg-black bg-opacity-60 p-3 rounded-full hover:bg-opacity-30 hover:bg-white"
        >
          <TbChevronLeft className="text-white text-3xl" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={() =>
            setCurrentImageIndex(
              (prevIndex) => (prevIndex + 1) % coverImages.length
            )
          }
          className="absolute right-4 top-1/2 bg-black bg-opacity-60 p-3 rounded-full hover:bg-opacity-30 hover:bg-white"
        >
          <TbChevronRight className="text-white text-3xl" />
        </button>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {coverImages.map((_, index) => (
            <div
              key={index}
              className={`w-4 h-4 rounded-full ${
                index === currentImageIndex ? "bg-blue-500" : "bg-gray-400" // color of dots
              }`}
            ></div>
          ))}
        </div>
      </header>

      <div className="absolute top-0 left-0 w-full p-4">
        <div className="flex justify-between items-center">
          <img src={logo} className="w-32 h-auto" alt="Logo" />

          <div className="flex space-x-4">
            <Link
              to="/subscribe"
              className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 cursor-pointer"
            >
              Subscribe
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  className="bg-blue-100 text-black font-semibold py-2 px-4 rounded-lg hover:bg-blue-300 cursor-pointer"
                >
                  <FiHome className="m-1 w-5" />
                </Link>
                <button
                  onClick={logout}
                  className="bg-red-100 text-black font-semibold py-2 px-4 rounded-lg hover:bg-red-600 cursor-pointer"
                >
                  <FiLogOut className="mr-2" />
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-800 cursor-pointer"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="relative p-8 bg-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-6">
          {/* Risk Management */}
          <Link
            to="/risk-management"
            className="text-center p-6 max-w-xs mx-auto border-blue-500 border-2 rounded-lg relative hover:shadow-xl"
          >
            <div className="bg-blue-800 rounded-full w-28 h-28 flex items-center justify-center mx-auto mb-4">
              <RxExclamationTriangle className="text-white text-6xl cursor-pointer" />
            </div>
            <h2 className="text-lg font-bold">Risk Management</h2>
            <p className="text-sm mt-2">
              Risk management is intended to manage financial and other losses
              associated with risks to your assets or business.
            </p>
          </Link>

          {/* About Us */}
          <Link
            to="/about-us"
            className="text-center p-6 max-w-xs mx-auto border-blue-500 border-2 rounded-lg relative  hover:shadow-xl"
          >
            <div className="bg-blue-800 rounded-full w-28 h-28 flex items-center justify-center mx-auto mb-4">
              <FaUsers className="text-white text-6xl cursor-pointer" />
            </div>
            <h2 className="text-lg font-bold">About Us</h2>
            <p className="text-sm mt-2">
              Through rapid development, depth of knowledge, innovative
              thinking, and commitment to diversity, we help save time, money,
              and lives.
            </p>
          </Link>

          {/* Contact Us */}
          <Link
            to="/contact-us"
            className="text-center p-6 max-w-xs mx-auto border-blue-500 border-2 rounded-lg relative  hover:shadow-xl"
          >
            <div className="bg-blue-800 rounded-full w-28 h-28 flex items-center justify-center mx-auto mb-4">
              <TfiHeadphoneAlt className="text-white text-6xl cursor-pointer" />
            </div>

            <h2 className="text-lg font-bold">Contact Us</h2>
            <p className="text-sm mt-2">
              Get in touch with us for any inquiries, support, or assistance.
              We're here to help!
            </p>
          </Link>

          {/* Feedback */}
          <Link
            to="/feedback"
            className="text-center p-6 max-w-xs mx-auto border-blue-500 border-2 rounded-lg relative  hover:shadow-xl"
          >
            <div className="bg-blue-800 rounded-full w-28 h-28 flex items-center justify-center mx-auto mb-4">
              <VscFeedback className="text-white text-6xl cursor-pointer" />
            </div>

            <h2 className="text-lg font-bold">Feedback</h2>
            <p className="text-sm mt-2">
              Your opinion matters! Share your thoughts and help us improve your
              experience.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
