import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";
import NewSidebar from "../components/NewSidebar";

const Layout = () => {
  return (
    <div className="min-h-screen h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <NewSidebar />
        <div className="flex-1 mx-4 mb-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
