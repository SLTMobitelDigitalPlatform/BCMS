import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Layout = () => {
  return (
    <div className="min-h-screen h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 ml-10 mr-4 mb-2 overflow-hidden bg-red-500">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
