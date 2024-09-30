import { Link, Outlet, useParams } from "react-router-dom";
import BCPNavigation from "../../../components/BCPNavigation";

const BusinessContinuityPlanLayout = () => {
  const { bcpid } = useParams();

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <Link
        className="text-2xl mb-5 font-bold text-green-500"
        to={"/business-continuity-plans"}
      >
        Business Continuity Plan: {bcpid}
      </Link>
      <BCPNavigation />
      <div className="overflow-hidden h-full">
        <Outlet />
      </div>
    </div>
  );
};

export default BusinessContinuityPlanLayout;
