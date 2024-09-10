import { Outlet } from "react-router-dom";
import BIANavigation from "../../../components/BIANavigation";

const BiaLayout = () => {
  return (
    <div className="h-full flex flex-col overflow-hidden">
      <h1 className="text-2xl mb-3 font-bold text-green-500">
        BIA
      </h1>
      <BIANavigation />
      <div className="overflow-hidden h-screen rounded-2xl bg-indigo-100 mt-3">
        <Outlet />
      </div>
    </div>
  );
};

export default BiaLayout;
