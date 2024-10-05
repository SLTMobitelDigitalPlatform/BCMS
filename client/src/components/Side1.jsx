import axios from "axios";
import { useEffect, useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import {
  FaCalendarDays,
  FaChevronDown,
  FaFileContract,
  FaFileInvoiceDollar,
  FaFilePen,
  FaFileShield,
  FaFolderOpen,
  FaFolderTree,
  FaHouse,
  FaListCheck,
  FaPeopleArrows,
  FaPeopleRoof,
  FaRightFromBracket,
  FaSitemap,
  FaUser,
  FaUserGroup,
  FaUserPen,
  FaUsers,
  FaVideo,
} from "react-icons/fa6";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const Side1 = () => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [userName, setUserName] = useState("");
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
        setUserName(response.data.name);
        setPreviewUrl(fullImageUrl);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  const location = useLocation();
  const [hoveredMenu, setHoveredMenu] = useState(null);

  const { logout } = useAuth();
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

  const [expanded, setExpanded] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleDropdownToggle = (dropdown) => {
    if (!expanded) {
      setExpanded(true);
    }
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const Menus = [
    {
      title: "System Management",
      submenu: true,
      icon: <FaPeopleRoof />,
      submenuItems: [
        { title: "Employees", icon: <FaUserPen />, link: "/employee" },
        { title: "Teams", icon: <FaUserGroup />, link: "/teams/teamList" },
        { title: "Sections", icon: <FaUsers />, link: "/sections" },
        { title: "Customers", icon: <FaPeopleArrows />, link: "/customers" },
      ],
    },
    {
      title: "System Documents",
      icon: <FaFolderOpen />,
      submenu: true,
      submenuItems: [
        {
          title: "Risk Assessment",
          icon: <FaFilePen />,
          link: "/Risk-Assessment/versionControl",
        },
        {
          title: "Context of the Organization",
          icon: <FaFilePen />,
          link: "/Context-of-the-Organization/version-control",
        },
        {
          title: "Business Continuity Plan",
          icon: <FaFilePen />,
          link: "/business-continuity-plans",
        },
        {
          title: "Business Impact Analysis",
          icon: <FaFilePen />,
          link: "/business-impact-analysis-plans",
        },
      ],
    },
    {
      title: "Organizational Documents",
      icon: <FaFolderTree />,

      submenu: true,
      submenuItems: [
        {
          title: "Policies & Guidelines",
          icon: <FaFileContract />,
          link: "/policies",
        },
        {
          title: "Call Tree",
          icon: <FaSitemap />,
          link: "/call-tree-home",
        },
        {
          title: "Audit Report",
          icon: <FaFileInvoiceDollar />,
          link: "/a",
        },
        {
          title: "Drill Report",
          icon: <FaFileShield />,
          link: "/d",
        },
      ],
    },
    {
      title: "Meetings",
      spacing: true,
      icon: <FaVideo />,
      link: "/meeting",
    },
    { title: "Calendar", icon: <FaCalendarDays />, link: "/calendar" },
    {
      title: "Roles & Responsibilities",
      icon: <FaListCheck />,
      link: "/roles",
    },
    { title: "Home", spacing: true, icon: <FaHouse />, link: "/" },
    { title: "Profile", icon: <FaUser />, link: "/profile" },
  ];

  return (
    <div
      className={`bg-indigo-950 p-4 pt-6 relative duration-300 ${
        expanded ? "w-72" : "w-20"
      }`}
    >
      <BsArrowLeftShort
        className={`bg-white text-indigo-950 text-3xl rounded-full absolute -right-3 top-7 border-2 border-indigo-950  cursor-pointer ${
          !expanded && "rotate-180"
        }`}
        onClick={() => setExpanded(!expanded)}
      />
      <div className="flex justify-between items-center">
        <Link to="/profile">
          <img
            src={
              previewUrl ||
              `https://eu.ui-avatars.com/api/?name=${userName}&size=250`
            }
            alt="Profile"
            className="profile-pic"
          />
        </Link>
        <h1
          className={`text-4xl font-bold text-sky-400 duration-300 overflow-hidden transition-all ${
            expanded ? "w-40" : "w-0"
          }`}
        >
          BCMS
        </h1>
      </div>

      <ul className="pt-4">
        {Menus.map((menu, index) => {
          const isSubmenuActive = menu.submenu
            ? menu.submenuItems.some((submenuItem) =>
                location.pathname.includes(submenuItem.link)
              )
            : false;

          return (
            <div key={index}>
              {menu.submenu ? (
                // Submenu item
                <li
                  className={`text-white text-sm flex justify-center items-center gap-x-4 cursor-pointer p-2 hover:bg-indigo-600 rounded-md transition-all duration-300 ${
                    menu.spacing ? "mt-7" : "mt-1"
                  } ${isSubmenuActive ? "bg-indigo-800" : ""}`}
                  onClick={() => {
                    handleDropdownToggle(index);
                  }}
                  onMouseEnter={() => setHoveredMenu(index)}
                  onMouseLeave={() => setHoveredMenu(null)}
                >
                  <span className="text-2xl">{menu.icon || <FaUser />}</span>
                  <span
                    className={`font-medium whitespace-nowrap flex-1 duration-300 overflow-hidden transition-all ${
                      !expanded && "hidden"
                    }`}
                  >
                    {menu.title}
                  </span>
                  {expanded && (
                    <FaChevronDown
                      className={`duration-300 ${
                        activeDropdown === index ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </li>
              ) : (
                // Regular menu item with NavLink and isActive
                <NavLink
                  to={menu.link}
                  key={index}
                  className={({ isActive }) =>
                    `text-white text-sm flex justify-center items-center gap-x-4 cursor-pointer p-2  rounded-md transition-all duration-300 ${
                      menu.spacing ? "mt-7" : "mt-1"
                    } ${isActive ? "bg-indigo-800" : "hover:bg-indigo-600"}`
                  }
                  onMouseEnter={() => setHoveredMenu(index)}
                  onMouseLeave={() => setHoveredMenu(null)}
                >
                  <span className="text-2xl">{menu.icon}</span>
                  <span
                    className={`font-medium whitespace-nowrap flex-1 duration-300 overflow-hidden transition-all ${
                      !expanded && "hidden"
                    }`}
                  >
                    {menu.title}
                  </span>
                </NavLink>
              )}

              {/* Tooltip for collapsed sidebar */}
              {!expanded && hoveredMenu === index && (
                <div className="absolute bg-indigo-600 text-xs text-white p-2 rounded-md ml-14 -mt-10 transition-all duration-300">
                  {menu.title}
                </div>
              )}

              {/* Render submenu items */}
              {menu.submenu && activeDropdown === index && expanded && (
                <ul>
                  {menu.submenuItems.map((submenuItem, submenuIndex) => (
                    <NavLink
                      to={submenuItem.link}
                      key={submenuIndex}
                      className={({ isActive }) =>
                        `text-white text-sm flex items-center gap-x-4 cursor-pointer p-2 px-5  rounded-md transition-all duration-300 ${
                          isActive ? "bg-indigo-800" : "hover:bg-indigo-600"
                        }`
                      }
                    >
                      <span className="text-2xl">{submenuItem.icon || ""}</span>
                      <span className="transition-all duration-300">
                        {submenuItem.title}
                      </span>
                    </NavLink>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
        {/* Logout option */}
        <li
          onClick={handleLogout}
          className="text-white text-sm flex justify-center items-center gap-x-4 cursor-pointer p-2 hover:bg-indigo-600 rounded-md"
          onMouseEnter={() => setHoveredMenu("logout")}
          onMouseLeave={() => setHoveredMenu(null)}
        >
          <span className="text-2xl">{<FaRightFromBracket />}</span>
          <span
            className={`font-medium whitespace-nowrap flex-1 duration-300 overflow-hidden transition-all ${
              !expanded && "hidden"
            }`}
          >
            Logout
          </span>
          {!expanded && hoveredMenu === "logout" && (
            <div className="absolute bg-indigo-600 text-xs text-white p-2 rounded-md ml-28 transition-all duration-300">
              Logout
            </div>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Side1;

{
  /* <div className="p-5 pt-8 w-72"> */
}
{
  /* <NavLink
          to="/profile"
          className={`text-3xl text-center font-bold text-sky-400 overflow-hidden transition-all ${
            expanded ? "w-32" : "w-0"
          }`}
        >
          BCMS
        </NavLink> */
}
{
  /* </div> */
}

// const SidebarItem = ({ icon, text, active }) => {
//     const { expanded } = useContext(SidebarContext);
//     return (
//       <li
//         className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
//           active
//             ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
//             : "hover:bg-indigo-50 text-gray-600"
//         }`}
//       >
//         {icon}
//         <span
//           className={`overflow-hidden transition-all ${
//             expanded ? "w-52 ml-3" : "w-0"
//           }`}
//         >
//           {text}
//         </span>
//         {!expanded && (
//           <div
//             className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
//           >
//             {text}
//           </div>
//         )}
//       </li>
//     );
//   };

{
  /* <SidebarContext.Provider value={{ expanded }}> */
}
// <ul className="pt-2">
{
  /* <SidebarItem icon={<FaUser />} text="Employees" active />
            <hr className="my-1" />
            <SidebarItem icon={<FaClipboardList />} text="Documents" /> */
}

{
  /* </SidebarContext.Provider> */
}

{
  /* <div className="border-t flex p-3">
          <img src={image} className="w-10 h-10 rounded" />
          <div
            className={`flex justify-between items-center overflow-hidden transition-all ${
              expanded ? "w-52 ml-3" : "w-0"
            }`}
          >
            <div className="leading-4">
              <h4 className="semibold">John</h4>
              <span className="text-sm text-gray-600">email</span>
            </div>
            <FaEllipsisVertical />
          </div>
        </div> */
}

//   <>
//     <li
//       key={index}
//       className={`text-white text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-indigo-600 rounded-md ${
//         menu.spacing ? "mt-7" : "mt-1"
//       }`}
//     >
//       <span className="text-lg block float-left">
//         {menu.icon ? menu.icon : <FaUser />}
//       </span>
//       <span
//         className={` font-medium flex-1 duration-300 ${
//           !expanded && "hidden"
//         }`}
//       >
//         {menu.title}
//       </span>
//       {menu.submenu && expanded && (
//         <FaChevronDown
//           className={`duration-300 ${
//             activeDropdown === index ? "rotate-180" : ""
//           }`}
//           onClick={() => {
//             handleDropdownToggle(index);
//           }}
//         />
//       )}
//     </li>
//     {menu.submenu && activeDropdown === index && expanded && (
//       <ul>
//         {menu.submenuItems.map((submenuItem, index) => (
//           <li
//             key={index}
//             className="text-white text-sm flex items-center gap-x-4 cursor-pointer p-2 px-5 hover:bg-indigo-600 rounded-md"
//           >
//             {submenuItem.title}
//           </li>
//         ))}
//       </ul>
//     )}
//   </>
