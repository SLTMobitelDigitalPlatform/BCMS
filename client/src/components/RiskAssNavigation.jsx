import { NavLink } from "react-router-dom";

const RiskAssNavigation = () => {
  return (
    <div>
      <div className="flex justify-between items-center text-white font-semibold">
        <NavLink
          to="/Risk-Assessment/versionControl"
          className={({ isActive }) =>
            `px-2 py-1 rounded ${
              isActive ? "bg-green-500" : "bg-indigo-900 hover:bg-indigo-600"
            }`
          }
        >
          Version Control
        </NavLink>
        <NavLink
          to="/Risk-Assessment/informationSecurity"
          className={({ isActive }) =>
            `px-2 py-1 rounded ${
              isActive ? "bg-green-500" : "bg-indigo-900 hover:bg-indigo-600"
            }`
          }
        >
          Information Security
        </NavLink>
        <NavLink
          to="/Risk-Assessment/bcpRisk"
          className={({ isActive }) =>
            `px-2 py-1 rounded ${
              isActive ? "bg-green-500" : "bg-indigo-900 hover:bg-indigo-600"
            }`
          }
        >
          Business Continuity
        </NavLink>
        <NavLink
          to="/Risk-Assessment/qualityManagement"
          className={({ isActive }) =>
            `px-2 py-1 rounded ${
              isActive ? "bg-green-500" : "bg-indigo-900 hover:bg-indigo-600"
            }`
          }
        >
          Quality Management
        </NavLink>
        <NavLink
          to="/Risk-Assessment/residualRisk"
          className={({ isActive }) =>
            `px-2 py-1 rounded ${
              isActive ? "bg-green-500" : "bg-indigo-900 hover:bg-indigo-600"
            }`
          }
        >
          Residual Risk Assesment
        </NavLink>
        <NavLink
          to="/Risk-Assessment/riskElements"
          className={({ isActive }) =>
            `px-2 py-1 rounded ${
              isActive ? "bg-green-500" : "bg-indigo-900 hover:bg-indigo-600"
            }`
          }
        >
          Risk Elements
        </NavLink>
      </div>
    </div>
  );
};

export default RiskAssNavigation;
