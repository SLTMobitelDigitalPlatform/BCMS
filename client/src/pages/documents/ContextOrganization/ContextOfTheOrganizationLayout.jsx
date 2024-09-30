import { Outlet } from "react-router-dom";
import ContextNavigation from "../../../components/ContextNavigation";

const ContextOfTheOrganizationLayout = () => {
  return (
    <div className="h-full flex flex-col overflow-hidden">
      <h1 className="text-2xl mb-5 font-bold text-green-500">
        Context Of The Organization
      </h1>
      <ContextNavigation />
      <div className="overflow-hidden h-full">
        <Outlet />
      </div>
    </div>
  );
};

export default ContextOfTheOrganizationLayout;
