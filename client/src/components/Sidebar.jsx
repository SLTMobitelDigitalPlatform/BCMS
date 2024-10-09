import { useEffect, useState } from "react";
import { FaBars, FaChevronDown, FaXmark } from "react-icons/fa6";

import { NavLink } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const closeSidebar = () => setIsOpen(false);

  const handleDropdownToggle = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleOutsideClick = (e) => {
    if (!e.target.closest(".sidebar-dropdown")) {
      setActiveDropdown(null);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const { logout } = useAuth();
  const handleLogout = async () => {
    try {
      // localStorage.removeItem("token");
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
    <>
      {/* Hamburger Icon */}
      <button
        className="p-2 focus:outline-none z-50 fixed top-1 left-3"
        onClick={toggleSidebar}
      >
        {isOpen ? (
          <FaXmark className="text-white" size={24} />
        ) : (
          <FaBars className="text-indigo-900" size={24} />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-indigo-950 text-white p-5 transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } w-64 flex flex-col justify-between`}
      >
        <div className="text-4xl text-center font-bold text-sky-400">
          <NavLink to="/profile" onClick={closeSidebar}>
            BCMS
          </NavLink>
        </div>

        <ul className="text-base font-semibold flex flex-col gap-2 text-left">
          {/* System Management */}
          <li className="relative sidebar-dropdown">
            <button
              onClick={() => handleDropdownToggle("management")}
              className="flex items-center justify-between w-full px-4 py-2 rounded-2xl sidebar-hover transition-all duration-300"
            >
              System Management <FaChevronDown className="ml-2" />
            </button>
            {activeDropdown === "management" && (
              <ul className="absolute left-0 w-full bg-white text-black text-sm rounded-2xl p-1 z-10">
                <li>
                  <NavLink
                    to="/employee"
                    className={({ isActive }) =>
                      `sidebar-link ${
                        isActive ? "dropdown-active" : "dropdown-hover"
                      }`
                    }
                    onClick={closeSidebar}
                  >
                    Employees
                  </NavLink>
                </li>
                <hr className="my-1 border-black opacity-50" />
                <li>
                  <NavLink
                    to="/teams/teamList"
                    className={({ isActive }) =>
                      `sidebar-link ${
                        isActive ? "dropdown-active" : "dropdown-hover"
                      }`
                    }
                    onClick={closeSidebar}
                  >
                    Teams
                  </NavLink>
                </li>
                <hr className="my-1 border-black opacity-50" />
                <li>
                  <NavLink
                    to="/customers"
                    className={({ isActive }) =>
                      `sidebar-link ${
                        isActive ? "dropdown-active" : "dropdown-hover"
                      }`
                    }
                    onClick={closeSidebar}
                  >
                    Customers
                  </NavLink>
                </li>
                <hr className="my-1 border-black opacity-50" />
              </ul>
            )}
          </li>
          <hr className="opacity-50" />
          {/* Documents */}
          <li className="relative sidebar-dropdown">
            <button
              onClick={() => handleDropdownToggle("documents")}
              className="flex items-center justify-between w-full px-4 py-2 rounded-2xl sidebar-hover transition-all duration-300"
            >
              System Documents <FaChevronDown className="ml-2" />
            </button>
            {activeDropdown === "documents" && (
              <ul className="absolute left-0 w-full bg-white text-black text-sm rounded-2xl p-1 z-10">
                <li>
                  <NavLink
                    to="/Risk-Assessment/versionControl"
                    className={({ isActive }) =>
                      `sidebar-link ${
                        isActive ? "dropdown-active" : "dropdown-hover"
                      }`
                    }
                    onClick={closeSidebar}
                  >
                    Risk Assessment
                  </NavLink>
                </li>
                <hr className="my-1 border-black opacity-50" />
                <li>
                  <NavLink
                    to="Context-of-the-Organization/version-control"
                    className={({ isActive }) =>
                      `sidebar-link ${
                        isActive ? "dropdown-active" : "dropdown-hover"
                      }`
                    }
                    onClick={closeSidebar}
                  >
                    Context of the Organization
                  </NavLink>
                </li>
                <hr className="my-1 border-black opacity-50" />
                <li>
                  <NavLink
                    to="/business-continuity-plans"
                    className={({ isActive }) =>
                      `sidebar-link ${
                        isActive ? "dropdown-active" : "dropdown-hover"
                      }`
                    }
                    onClick={closeSidebar}
                  >
                    Business Continuity Plan
                  </NavLink>
                </li>
                <hr className="my-1 border-black opacity-50" />
                <li>
                  <NavLink
                    to="/business-impact-analysis-plans"
                    className={({ isActive }) =>
                      `sidebar-link ${
                        isActive ? "dropdown-active" : "dropdown-hover"
                      }`
                    }
                    onClick={closeSidebar}
                  >
                    Business Impact Analysis
                  </NavLink>
                </li>
                <hr className="my-1 border-black opacity-50" />
              </ul>
            )}
          </li>
          <hr className="opacity-50" />
          <li>
            <NavLink
              to="/meeting"
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "sidebar-active" : "sidebar-hover"}`
              }
              onClick={closeSidebar}
            >
              Meetings
            </NavLink>
          </li>
          <hr className="opacity-50" />
          <li>
            <NavLink
              to="/calendar"
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "sidebar-active" : "sidebar-hover"}`
              }
              onClick={closeSidebar}
            >
              Calendar
            </NavLink>
          </li>
          <hr className="opacity-50" />
          <li>
            <NavLink
              to="/policies"
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "sidebar-active" : "sidebar-hover"}`
              }
              onClick={closeSidebar}
            >
              Policies and Guidelines
            </NavLink>
          </li>
          <hr className="opacity-50" />
          <li>
            <NavLink
              to="/call-tree-home"
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "sidebar-active" : "sidebar-hover"}`
              }
              onClick={closeSidebar}
            >
              Call Tree
            </NavLink>
          </li>
          <hr className="opacity-50" />
        </ul>

        <button
          className="py-1 bg-sky-400 hover:bg-sky-500 hover:text-white text-black font-semibold rounded-2xl"
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
    </>
  );
};

export default Sidebar;
