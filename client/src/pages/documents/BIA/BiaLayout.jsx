import { Link, Outlet, useParams } from "react-router-dom";
import BIANavigation from "../../../components/BIANavigation";

const BiaLayout = () => {
  const { biaid } = useParams();

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <Link
        className="text-2xl mb-5 font-bold text-green-500"
        to={"/business-impact-analysis-plans"}
      >
        Business Impact Analysis Plan: {biaid}
      </Link>
      <BIANavigation />
      <div className="overflow-hidden h-full">
        <Outlet />
      </div>
    </div>
  );
};

export default BiaLayout;
