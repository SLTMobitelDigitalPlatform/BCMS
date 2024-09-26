import { Outlet } from "react-router-dom";
import BIANavigation from "../../../components/BIANavigation";

const BiaLayout = () => {
  return (
    <div className="h-full flex flex-col overflow-hidden">
      <h1 className="text-2xl mb-3 font-bold text-green-500">
        Business Impact Analysis
      </h1>
      <BIANavigation />
      <div className="overflow-hidden h-full">
        <Outlet />
      </div>
    </div>
  );
};

export default BiaLayout;
