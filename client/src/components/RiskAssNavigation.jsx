import { NavLink } from "react-router-dom";

const RiskAssNavigation = () => {
  return (
    <div>
      <div className="flex justify-between items-center  font-semibold">
        <NavLink
          to="/Risk-Assessment/versionControl"
          className={({ isActive }) =>
            `whitespace-nowrap px-2 py-1 rounded ${
              isActive
                ? "bg-indigo-900 text-white border-2 border-indigo-900"
                : "border-2 border-indigo-900  hover:bg-indigo-200 "
            }`
          }
        >
          Version Control
        </NavLink>
        <NavLink
          to="/Risk-Assessment/informationSecurity"
          className={({ isActive }) =>
            `whitespace-nowrap px-2 py-1 rounded ${
              isActive
                ? "bg-indigo-900 text-white border-2 border-indigo-900"
                : "border-2 border-indigo-900  hover:bg-indigo-200 "
            }`
          }
        >
          Information Security
        </NavLink>
        <NavLink
          to="/Risk-Assessment/bcpRisk"
          className={({ isActive }) =>
            `whitespace-nowrap px-2 py-1 rounded ${
              isActive
                ? "bg-indigo-900 text-white border-2 border-indigo-900"
                : "border-2 border-indigo-900  hover:bg-indigo-200 "
            }`
          }
        >
          Business Continuity
        </NavLink>
        <NavLink
          to="/Risk-Assessment/qualityManagement"
          className={({ isActive }) =>
            `whitespace-nowrap px-2 py-1 rounded ${
              isActive
                ? "bg-indigo-900 text-white border-2 border-indigo-900"
                : "border-2 border-indigo-900  hover:bg-indigo-200 "
            }`
          }
        >
          Quality Management
        </NavLink>
        <NavLink
          to="/Risk-Assessment/residualRisk"
          className={({ isActive }) =>
            `whitespace-nowrap px-2 py-1 rounded ${
              isActive
                ? "bg-indigo-900 text-white border-2 border-indigo-900"
                : "border-2 border-indigo-900  hover:bg-indigo-200 "
            }`
          }
        >
          Residual Risk Assesment
        </NavLink>
        <NavLink
          to="/Risk-Assessment/riskElements"
          className={({ isActive }) =>
            `whitespace-nowrap px-2 py-1 rounded ${
              isActive
                ? "bg-indigo-900 text-white border-2 border-indigo-900"
                : "border-2 border-indigo-900  hover:bg-indigo-200 "
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
