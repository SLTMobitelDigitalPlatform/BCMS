import { Link, Outlet } from "react-router-dom";
import BCPNavigation from "../../../components/BCPNavigation";

const BusinessContinuityPlanLayout = () => {
  return (
    <div className="h-full flex flex-col overflow-hidden">
      <Link
        className="text-2xl mb-3 font-bold text-green-500"
        to={"/business-continuity-plans"}
      >
        Business Continuity Plan
      </Link>
      <BCPNavigation />
      <div className="overflow-hidden h-screen rounded-2xl bg-indigo-100 mt-3">
        <Outlet />
      </div>
    </div>
  );
};

export default BusinessContinuityPlanLayout;
