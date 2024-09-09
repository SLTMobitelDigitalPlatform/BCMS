import { NavLink, useLocation } from "react-router-dom";

const ContextNavigation = () => {
  // const location = useLocation();

  // const links = [
  //   {
  //     name: "Version Control",
  //     path: "/Context-of-the-Organization/version-control",
  //   },
  //   {
  //     name: "Interested Parties",
  //     path: "/Context-of-the-Organization/interested-parties",
  //   },
  //   {
  //     name: "Issue Register",
  //     path: "/Context-of-the-Organization/issue-register",
  //   },
  //   {
  //     name: "Interfaces and Dependencies",
  //     path: "/Context-of-the-Organization/interfaces-and-dependencies",
  //   },
  //   { name: "Objectives", path: "/Context-of-the-Organization/objectives" },
  //   {
  //     name: "Master of Procedures and Process",
  //     path: "/Context-of-the-Organization/master-of-procedures-and-process",
  //   },
  // ];

  return (
    <div>
      <div className="flex justify-between items-center text-white font-semibold">
        {[
          "Version Control",
          "Interested Parties",
          "Issue Register",
          "Interfaces and Dependencies",
          "Objectives",
          "Master of Procedures and Process",
        ].map((link, idx) => (
          <NavLink
            key={idx}
            to={`/Context-of-the-Organization/${link
              .replace(/\s+/g, "-")
              .toLowerCase()}`}
            // className={`px-2 py-1 rounded-lg ${
            //   location.pathname.includes(link.path)
            //     ? "bg-green-500"
            //     : "bg-indigo-900 hover:bg-indigo-600"
            // }`}
            className={({ isActive }) =>
              `whitespace-nowrap px-2 py-1 rounded-lg ${
                isActive ? "bg-green-500" : "bg-indigo-900 hover:bg-indigo-600"
              }`
            }
          >
            {link}
          </NavLink>
        ))}
        {/* <NavLink
          to="/Context-of-the-Organization/VersionControls"
          className={({ isActive }) =>
            `px-2 py-1 rounded ${
              isActive ? "bg-green-500" : "bg-indigo-900 hover:bg-indigo-600"
            }`
          }
        >
          Version Control
        </NavLink>
        <NavLink

          to="/Context-of-the-Organization/interseted-parties/internal-party"
          className={`px-2 py-1 rounded-lg ${
            location.pathname.includes(
              "/Context-of-the-Organization/interseted-parties"
            )
              ? "bg-green-500"
              : "bg-indigo-900 hover:bg-indigo-600"
          }`}

        >
          Interested Parties
        </NavLink>
        <NavLink
          to="/Context-of-the-Organization/issue-register/internalIssues"
          className={`px-2 py-1 rounded-lg ${
            location.pathname.includes(
              "/Context-of-the-Organization/issue-register"
            )
              ? "bg-green-500"
              : "bg-indigo-900 hover:bg-indigo-600"
          }`}

        >
          Issue Register
        </NavLink>
        <NavLink
          to="/Context-of-the-Organization/interfaces"
          className={({ isActive }) =>
            `px-2 py-1 rounded ${
              isActive ? "bg-green-500" : "bg-indigo-900 hover:bg-indigo-600"
            }`
          }
        >
          Interfaces and Dependencies
        </NavLink>
        <NavLink
          to="/Context-of-the-Organization/objectives"
          className={({ isActive }) =>
            `px-2 py-1 rounded ${
              isActive ? "bg-green-500" : "bg-indigo-900 hover:bg-indigo-600"
            }`
          }
        >
          Objectives
        </NavLink>
        <NavLink
          to="/Context-of-the-Organization/masterProcedures"
          className={({ isActive }) =>
            `px-2 py-1 rounded ${
              isActive ? "bg-green-500" : "bg-indigo-900 hover:bg-indigo-600"
            }`
          }
        >
          Master of Procedures and Process
        </NavLink> */}
      </div>
    </div>
  );
};

export default ContextNavigation;
