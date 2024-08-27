import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { FaChevronDown } from "react-icons/fa";

const NewSidebar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  //   const [activeDropdownItem, setActiveDropdownItem] = useState(null);

  //   const handleDropdownItemClick = (item) => {
  //     setActiveDropdownItem(item);
  //   };

  const { logout } = useAuth();
  const handleLogout = async () => {
    try {
      // localStorage.removeItem("token");
      logout();
      window.location.href = "/login";
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  return (
    <div className="bg-indigo-950 text-white w-1/5 p-5 rounded-2xl ml-5 mb-2 flex flex-col justify-between">
      <div className="text-4xl text-center font-bold text-sky-400">
        <NavLink to={"/profile"}>BCMS</NavLink>
      </div>
      {/* <p>/document/!doc name!/!doc section!</p> */}
      <div>
        <ul className="text-base font-semibold flex flex-col gap-2 text-left">
          {/* Employees */}
          <li>
            <NavLink
              to="/employee"
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "sidebar-active" : "sidebar-hover"}`
              }
            >
              Employee
            </NavLink>
          </li>
          <hr className="opacity-50" />

          {/* Documents */}
          <li className="relative">
            <button
              onClick={toggleDropdown}
              className={`flex items-center justify-between w-full px-4 py-2 rounded-2xl focus:outline-none ${
                location.pathname.startsWith("/risk") ||
                location.pathname.startsWith("/VersionControls") ||
                location.pathname.startsWith("/bcp") ||
                location.pathname.startsWith("/bia")
                  ? "sidebar-active"
                  : "sidebar-hover"
              }`}
            >
              Documents <FaChevronDown className="ml-2" />
            </button>
            {isDropdownOpen && (
              <ul className="absolute left-0 w-full bg-white text-black text-base rounded-2xl p-2 z-10">
                <li>
                  <NavLink
                    to="/riskVersionControl"
                    // className="block px-4 py-2 rounded-2xl items-center hover:dropdown-active"
                    className={({ isActive }) =>
                      `sidebar-link ${
                        isActive ? "dropdown-active" : "dropdown-hover"
                      }`
                    }
                    onClick={toggleDropdown}
                  >
                    Risk Assessment
                  </NavLink>
                </li>
                <hr className="my-1 border-black opacity-50" />
                <li>
                  <NavLink
                    to="/VersionControls"
                    className={({ isActive }) =>
                      `sidebar-link ${
                        isActive ? "dropdown-active" : "dropdown-hover"
                      }`
                    }
                    onClick={toggleDropdown}
                  >
                    Context of the Organization
                  </NavLink>
                </li>
                <hr className="my-1 border-black opacity-50" />
                <li>
                  <NavLink
                    to="/bcp"
                    className={({ isActive }) =>
                      `sidebar-link ${
                        isActive ? "dropdown-active" : "dropdown-hover"
                      }`
                    }
                  >
                    BCP
                  </NavLink>
                </li>
                <hr className="my-1 border-black opacity-50" />
                <li>
                  <NavLink
                    to="/bcp"
                    className={({ isActive }) =>
                      `sidebar-link ${
                        isActive ? "dropdown-active" : "dropdown-hover"
                      }`
                    }
                  >
                    BIA
                  </NavLink>
                </li>
                <hr className="my-1 border-black opacity-50" />
              </ul>
            )}
          </li>
          <hr className="opacity-50" />
          {/* Meetings */}
          <li>
            <NavLink
              to="/meeting"
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "sidebar-active" : "sidebar-hover"}`
              }
            >
              Meetings
            </NavLink>
          </li>
          <hr className="opacity-50" />
          {/* Calendar */}
          <li>
            <NavLink
              to="/calendar"
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "sidebar-active" : "sidebar-hover"}`
              }
            >
              Calendar
            </NavLink>
          </li>
          <hr className="opacity-50" />
          {/* Roles and Responsibilities */}
          <li>
            <NavLink
              to="/roles"
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "sidebar-active" : "sidebar-hover"}`
              }
            >
              Roles and Responsibilities
            </NavLink>
          </li>
          <hr className="opacity-50" />
          {/* Policies */}
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "sidebar-active" : "sidebar-hover"}`
              }
            >
              Policies
            </NavLink>
          </li>
          <hr className="opacity-50" />
          {/* Call Tree */}
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "sidebar-active" : "sidebar-hover"}`
              }
            >
              Call Tree
            </NavLink>
          </li>
          <hr className="opacity-50" />
          {/* Customers */}
          <li>
            <NavLink
              to="/customers"
              className={({ isActive }) =>
                `block px-4 py-2 rounded-2xl items-center ${
                  isActive ? "sidebar-active" : "sidebar-hover"
                }`
              }
            >
              Customer
            </NavLink>
          </li>
          <hr className="opacity-50" />
        </ul>
      </div>
      <div className="flex gap-3 mt-3 justify-center">
        <button
          className="px-8 py-1 bg-[#00BBF6] text-black font-semibold rounded-2xl"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default NewSidebar;
