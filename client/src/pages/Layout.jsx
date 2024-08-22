import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex gap-x-4 bg-sky-50">
        <Sidebar />
        <div className="flex-1 mr-6 ml-10 p-5 rounded-2xl bg-sky-100">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
