import { Outlet } from "react-router-dom";
import RiskAssNavigation from "../../../components/RiskAssNavigation";

const RiskAssessmentLayout = () => {
  return (
    <div className="h-full flex flex-col overflow-hidden">
      <h1 className="text-2xl mb-5 font-bold text-green-500">
        Risk Assessment
      </h1>
      <RiskAssNavigation />
      <div className="overflow-hidden h-full">
        <Outlet />
      </div>
    </div>
  );
};

export default RiskAssessmentLayout;
