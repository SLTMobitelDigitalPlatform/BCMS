import Welcome from "../../components/Welcome";
import SecreCoordinatorDashboard from "../../components/SecreCoordinatorDashboard";

const EmployeeHomePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex flex-1 flex-col lg:flex-row items-center justify-center bg-sky-50 border rounded-lg border-gray-300 shadow-md m-6 mt-2 p-2">
        <Welcome />
        <SecreCoordinatorDashboard />
      </main>
    </div>
  );
};

export default EmployeeHomePage;
