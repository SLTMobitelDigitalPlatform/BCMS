import { Link } from "react-router-dom";

const RiskAssNavigation = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <Link to="/riskVersionControl">
          <button className="px-3 py-1 border-2 border-sky-600 text-sky-600 hover:text-[#52B14A] hover:border-[#52B14A] font-semibold rounded-lg">
            Version Control
          </button>
        </Link>
        <Link to="/informationSecurity">
          <button className="px-3 py-1 border-2 border-sky-600 text-sky-600 hover:text-[#52B14A] hover:border-[#52B14A] font-semibold rounded-lg">
            Information Security
          </button>
        </Link>
        <Link to="/bcpRisk">
          <button className="px-3 py-1 border-2 border-sky-600 text-sky-600 hover:text-[#52B14A] hover:border-[#52B14A] font-semibold rounded-lg">
            BCP
          </button>
        </Link>
        <Link to="/qualityManagement">
          <button className="px-3 py-1 border-2 border-sky-600 text-sky-600 hover:text-[#52B14A] hover:border-[#52B14A] font-semibold rounded-lg">
            Quality Management
          </button>
        </Link>
        <Link to="/residualRisk">
          <button className="px-3 py-1 border-2 border-sky-600 text-sky-600 hover:text-[#52B14A] hover:border-[#52B14A] font-semibold rounded-lg">
            Residual Risk Assesment
          </button>
        </Link>
        <Link to="/riskElements">
          <button className="px-3 py-1 border-2 border-sky-600 text-sky-600 hover:text-[#52B14A] hover:border-[#52B14A] font-semibold rounded-lg">
            Risk Elements
          </button>
        </Link>
      </div>
    </div>
  );
};

export default RiskAssNavigation;
