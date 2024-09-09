import { Outlet } from "react-router-dom";
import BCPNavigation from "../../../components/BCPNavigation";

const BusinessContinuityPlanLayout = () => {
  return (
    <div className="h-full flex flex-col overflow-hidden">
      <h1 className="text-2xl mb-3 font-bold text-green-500">
        Context Of The Organization
      </h1>
      <BCPNavigation />
      <div className="overflow-hidden h-screen rounded-2xl bg-indigo-100 mt-3">
        <Outlet />
      </div>
    </div>
  );
};

export default BusinessContinuityPlanLayout;
