import Welcome from "../../components/Welcome";
import AdminDashboard from "../../components/AdminDashboard";

const AdminHomePage = () => {
  return (
    <div>
      <div className="flex w-full h-full  bg-blue-500 border-gray-300 shadow-md">
        <Welcome />
        <AdminDashboard />
      </div>
    </div>
  );
};

export default AdminHomePage;
