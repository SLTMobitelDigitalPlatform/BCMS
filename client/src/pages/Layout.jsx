import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import NewSidebar from "../components/NewSidebar";
import Side1 from "../components/Side1";
import { FaClipboardList, FaUser } from "react-icons/fa6";

const Layout = () => {
  return (
    <div className="min-h-screen h-screen flex flex-col">
      {/* <Navbar /> */}
      <div className="flex-1 flex overflow-hidden">
        {/* <NewSidebar /> */}
        <Side1 />
        <div className="flex-1 mx-4 mb-4 mt-4 overflow-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
