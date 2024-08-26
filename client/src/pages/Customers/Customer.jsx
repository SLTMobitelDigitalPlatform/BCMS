import Navbar from "../../components/Navbar";
import NewSidebar from "../../components/NewSidebar";

const Customer = () => {
  return (
    <div className="min-h-screen h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <NewSidebar />
        <div className="flex-1 ml-10 mr-4 mb-2 overflow-hidden bg-red-500">
          Customer
        </div>
      </div>
    </div>
  );
};

export default Customer;
