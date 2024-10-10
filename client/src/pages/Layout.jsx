import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Layout = () => {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <div className="flex-1 m-4 overflow-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;

{
  /* <div className="min-h-screen h-screen flex flex-col">
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <div className="flex-1 mx-4 mb-4 mt-4 overflow-hidden">
          <Outlet />
        </div>
      </div>
    </div> */
}
