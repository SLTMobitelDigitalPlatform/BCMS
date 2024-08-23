import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Layout = () => {
  return (
    <div className="min-h-screen h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1overflow-hidden">
        <Sidebar />
        <div className="flex-1 mr-6 ml-10 overflow-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
