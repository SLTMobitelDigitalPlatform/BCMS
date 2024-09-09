import { NavLink } from "react-router-dom";

const ContextNavigation = () => {
  return (
    <div>
      <div className="flex justify-between items-center text-white font-semibold">
        <NavLink
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
          to="/Context-of-the-Organization/externalParty"
          className={({ isActive }) =>
            `px-2 py-1 rounded ${
              isActive ? "bg-green-500" : "bg-indigo-900 hover:bg-indigo-600"
            }`
          }
        >
          Interested Parties
        </NavLink>
        <NavLink
          to="/Context-of-the-Organization/internalIssues"
          className={({ isActive }) =>
            `px-2 py-1 rounded ${
              isActive ? "bg-green-500" : "bg-indigo-900 hover:bg-indigo-600"
            }`
          }
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
        </NavLink>
      </div>
    </div>
  );
};

export default ContextNavigation;
