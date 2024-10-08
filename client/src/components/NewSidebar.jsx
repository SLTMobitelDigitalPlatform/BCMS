import { useState } from "react";
import {
  FaBars,
  FaChevronDown,
  FaXmark,
  FaUser,
  FaUsers,
  FaClipboardList,
} from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { FaCalendarAlt, FaFileAlt, FaPhoneAlt } from "react-icons/fa";

const NewSidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // For sidebar toggle
  const [activeDropdown, setActiveDropdown] = useState(null); // For dropdowns

  const toggleSidebar = () => setIsOpen(!isOpen); // Toggle sidebar
  const closeSidebar = () => setIsOpen(false); // Close sidebar on click
  const handleDropdownToggle = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown); // Handle dropdown toggle
  };

  const { logout } = useAuth(); // Logout functionality
  const handleLogout = async () => {
    try {
      localStorage.removeItem("scrollPosition");
      localStorage.removeItem("carouselIndex");
      logout();
      window.location.href = "/login";
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  return (
    <div className="flex">
      {/* Collapsible Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-indigo-950 text-white transition-all duration-300 ease-in-out z-40 ${
          isOpen ? "w-64" : "w-16"
        } flex flex-col justify-between`}
      >
        {/* Toggle Button */}
        <button
          className={`p-2 focus:outline-none z-50 fixed top-1 left-${
            isOpen ? "60" : "3"
          } transition-all duration-300`}
          onClick={toggleSidebar}
        >
          {isOpen ? <FaXmark size={24} /> : <FaBars size={24} />}
        </button>

        {/* Sidebar Content */}
        <div className="flex flex-col gap-4 mt-10">
          <NavLink
            to="/profile"
            className="flex items-center p-2 hover:bg-indigo-900 rounded transition-all"
            onClick={closeSidebar}
          >
            <FaUser size={20} />
            {isOpen && <span className="ml-4">Profile</span>}
          </NavLink>

          {/* System Management */}
          <div className="relative">
            <button
              onClick={() => handleDropdownToggle("management")}
              className="flex items-center p-2 w-full hover:bg-indigo-900 rounded transition-all"
            >
              <FaUsers size={20} />
              {isOpen && <span className="ml-4">System Management</span>}
              {isOpen && <FaChevronDown className="ml-auto" />}
            </button>
            {activeDropdown === "management" && isOpen && (
              <ul className="ml-8">
                <li>
                  <NavLink
                    to="/employee"
                    onClick={closeSidebar}
                    className="block p-2 text-sm hover:bg-indigo-900 rounded"
                  >
                    Employees
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/teams/teamList"
                    onClick={closeSidebar}
                    className="block p-2 text-sm hover:bg-indigo-900 rounded"
                  >
                    Teams
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/customers"
                    onClick={closeSidebar}
                    className="block p-2 text-sm hover:bg-indigo-900 rounded"
                  >
                    Customers
                  </NavLink>
                </li>
              </ul>
            )}
          </div>

          {/* Documents */}
          <div className="relative">
            <button
              onClick={() => handleDropdownToggle("documents")}
              className="flex items-center p-2 w-full hover:bg-indigo-900 rounded transition-all"
            >
              <FaFileAlt size={20} />
              {isOpen && <span className="ml-4">Documents</span>}
              {isOpen && <FaChevronDown className="ml-auto" />}
            </button>
            {activeDropdown === "documents" && isOpen && (
              <ul className="ml-8">
                <li>
                  <NavLink
                    to="/Risk-Assessment/versionControl"
                    onClick={closeSidebar}
                    className="block p-2 text-sm hover:bg-indigo-900 rounded"
                  >
                    Risk Assessment
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="Context-of-the-Organization/version-control"
                    onClick={closeSidebar}
                    className="block p-2 text-sm hover:bg-indigo-900 rounded"
                  >
                    Context of the Organization
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/business-continuity-plans"
                    onClick={closeSidebar}
                    className="block p-2 text-sm hover:bg-indigo-900 rounded"
                  >
                    Business Continuity Plan
                  </NavLink>
                </li>
              </ul>
            )}
          </div>

          {/* Other Links */}
          <NavLink
            to="/meeting"
            className="flex items-center p-2 hover:bg-indigo-900 rounded transition-all"
            onClick={closeSidebar}
          >
            <FaClipboardList size={20} />
            {isOpen && <span className="ml-4">Meetings</span>}
          </NavLink>
          <NavLink
            to="/calendar"
            className="flex items-center p-2 hover:bg-indigo-900 rounded transition-all"
            onClick={closeSidebar}
          >
            <FaCalendarAlt size={20} />
            {isOpen && <span className="ml-4">Calendar</span>}
          </NavLink>
          <NavLink
            to="/call-tree-home"
            className="flex items-center p-2 hover:bg-indigo-900 rounded transition-all"
            onClick={closeSidebar}
          >
            <FaPhoneAlt size={20} />
            {isOpen && <span className="ml-4">Call Tree</span>}
          </NavLink>
        </div>

        {/* Logout Button */}
        <button
          className="py-1 bg-sky-400 hover:bg-sky-500 hover:text-white text-black font-semibold rounded m-4"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default NewSidebar;
