import { useAuth } from "../../auth/AuthContext";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FaUsers } from "react-icons/fa";
import { RxExclamationTriangle } from "react-icons/rx";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { VscFeedback } from "react-icons/vsc";
import { FiHome, FiLogOut } from "react-icons/fi";
import image1 from "../../assets/header/1.jpg";
import image2 from "../../assets/header/2.jpg";
import image3 from "../../assets/header/3.jpg";
import logo from "../../assets/logo.png";

const coverImages = [image1, image2, image3];

// Responsive configuration for react-multi-carousel
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 1024, min: 768 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 768, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Home = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className="relative w-screen md:h-1/2 bg-black overflow-hidden mb-0">
      {/* Carousel section */}
      <header className="w-full md:h-1/2 flex justify-center items-center">
        <div className="md:w-2/3">
          <Carousel
            responsive={responsive}
            autoPlay={true}
            infinite={true}
            arrows={false}
            showDots={true}
            autoPlaySpeed={5000}
          >
            {coverImages.map((image, index) => (
              <div key={index}>
                <img
                  src={image}
                  alt={`Cover ${index + 1}`}
                  className="object-cover opacity-50 w-full h-full"
                />
              </div>
            ))}
          </Carousel>
        </div>
      </header>

      {/* Top section: Logo and buttons */}
      <div className="absolute top-0 left-0 w-full p-4">
        <div className="flex justify-between items-center">
          <img src={logo} className="w-24 h-auto" alt="Logo" />
          <div className="flex space-x-2">
            <Link
              to="/subscribe"
              className="bg-green-500 text-white font-semibold py-1 px-3 rounded-lg hover:bg-green-600 cursor-pointer"
            >
              Subscribe
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  className="bg-blue-100 text-black font-semibold py-1 px-3 rounded-lg hover:bg-blue-300 cursor-pointer"
                >
                  <FiHome className="m-1 w-5" />
                </Link>
                <button
                  onClick={logout}
                  className="bg-red-100 text-black font-semibold py-1 px-3 rounded-lg hover:bg-red-600 cursor-pointer"
                >
                  <FiLogOut className="mr-2" />
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-blue-700 text-white font-semibold py-1 px-3 rounded-lg hover:bg-blue-800 cursor-pointer"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main content: Links with icons at the bottom */}
      <div className="absolute bottom-0 left-0 w-full bg-sky-100">
        <div className="flex justify-center">
          {/* Container with max width and padding */}
          <div className="w-full max-w-5xl p-4 bg-sky-50 rounded-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Risk Management */}
              <Link
                to="/risk-management"
                className="text-center p-4 border-blue-500 border-2 rounded-lg relative hover:shadow-xl"
              >
                <div className="bg-blue-800 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-2">
                  <RxExclamationTriangle className="text-white text-4xl cursor-pointer" />
                </div>
                <h2 className="text-sm font-bold">Risk Management</h2>
                <p className="text-xs mt-2">
                  Manage financial and other losses associated with risks to
                  your assets or business.
                </p>
              </Link>
              {/* About Us */}
              <Link
                to="/about-us"
                className="text-center p-4 border-blue-500 border-2 rounded-lg relative hover:shadow-xl"
              >
                <div className="bg-blue-800 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-2">
                  <FaUsers className="text-white text-4xl cursor-pointer" />
                </div>
                <h2 className="text-sm font-bold">About Us</h2>
                <p className="text-xs mt-2">
                  We save time, money, and lives through innovative thinking and
                  commitment to diversity.
                </p>
              </Link>
              {/* Contact Us */}
              <Link
                to="/contact-us"
                className="text-center p-4 border-blue-500 border-2 rounded-lg relative hover:shadow-xl"
              >
                <div className="bg-blue-800 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-2">
                  <TfiHeadphoneAlt className="text-white text-4xl cursor-pointer" />
                </div>
                <h2 className="text-sm font-bold">Contact Us</h2>
                <p className="text-xs mt-2">
                  Get in touch with us for inquiries, support, or assistance.
                </p>
              </Link>
              {/* Feedback */}
              <Link
                to="/feedback"
                className="text-center p-4 border-blue-500 border-2 rounded-lg relative hover:shadow-xl"
              >
                <div className="bg-blue-800 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-2">
                  <VscFeedback className="text-white text-4xl cursor-pointer" />
                </div>
                <h2 className="text-sm font-bold">Feedback</h2>
                <p className="text-xs mt-2">
                  Your opinion matters! Share your thoughts and help us improve.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
