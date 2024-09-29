import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { FaChevronDown } from "react-icons/fa";

const NewSidebar = () => {
  const [documentDropdown, setDocumentDropdown] = useState(false);
  const [managementDropdown, setManagementDropdown] = useState(false);

  const toggleDocumentDropdown = () => {
    setDocumentDropdown(!documentDropdown);
  };

  const toggleManagementDropdown = () => {
    setManagementDropdown(!managementDropdown);
  };

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
    <div className="bg-indigo-950 text-white w-64 p-5 rounded-2xl mx-4 mb-4 flex flex-col justify-between">
      <div className="text-4xl text-center font-bold text-sky-400">
        <NavLink to={"/profile"}>BCMS</NavLink>
      </div>

      <div>
        <ul className="text-base font-semibold flex flex-col gap-2 text-left">
          {/* System Management */}
          <li className="relative">
            <div
              tabIndex={0}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget))
                  setManagementDropdown(false);
              }}
            >
              <button
                onClick={toggleManagementDropdown}
                className="flex items-center justify-between w-full px-4 py-2 rounded-2xl sidebar-hover transition-all duration-300"
              >
                System Management <FaChevronDown className="ml-2" />
              </button>
              {managementDropdown && (
                <ul className="absolute left-0 w-full bg-white text-black text-sm rounded-2xl p-2 z-10">
                  <li>
                    <NavLink
                      to="/employee"
                      className={({ isActive }) =>
                        `sidebar-link ${
                          isActive ? "dropdown-active" : "dropdown-hover"
                        }`
                      }
                      onClick={toggleManagementDropdown}
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
                      onClick={toggleManagementDropdown}
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
                      onClick={toggleManagementDropdown}
                    >
                      Customers
                    </NavLink>
                  </li>
                  <hr className="my-1 border-black opacity-50" />
                </ul>
              )}
            </div>
          </li>
          <hr className="opacity-50" />

          {/* Documents */}
          <li className="relative">
            <div
              tabIndex={0}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget))
                  setDocumentDropdown(false);
              }}
            >
              <button
                onClick={toggleDocumentDropdown}
                className="flex items-center justify-between w-full px-4 py-2 rounded-2xl sidebar-hover transition-all duration-300"
              >
                System Documents <FaChevronDown className="ml-2" />
              </button>
              {documentDropdown && (
                <ul className="absolute left-0 w-full bg-white text-black text-sm rounded-2xl p-1 z-10">
                  <li>
                    <NavLink
                      to="/Risk-Assessment/versionControl"
                      className={({ isActive }) =>
                        `sidebar-link ${
                          isActive ? "dropdown-active" : "dropdown-hover"
                        }`
                      }
                      onClick={toggleDocumentDropdown}
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
                      onClick={toggleDocumentDropdown}
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
                      onClick={toggleDocumentDropdown}
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
                      onClick={toggleDocumentDropdown}
                    >
                      Business Impact Analysis
                    </NavLink>
                  </li>
                  <hr className="my-1 border-black opacity-50" />
                </ul>
              )}
            </div>
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

          {/* Policies */}
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "sidebar-active" : "sidebar-hover"}`
              }
            >
              Policies and Guidelines
            </NavLink>
          </li>
          <hr className="opacity-50" />
          {/* Call Tree */}
          <li>
            <NavLink
              to="/call-tree"
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "sidebar-active" : "sidebar-hover"}`
              }
            >
              Call Tree
            </NavLink>
          </li>
          <hr className="opacity-50" />
        </ul>
      </div>
      <div className="flex gap-3 mt-3 justify-center">
        <button
          className="px-8 py-1 bg-sky-400 hover:bg-sky-500 text-black font-semibold rounded-2xl"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default NewSidebar;
