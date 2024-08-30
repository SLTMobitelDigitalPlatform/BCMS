import ContextNavigation from "../../../../components/ContextNavigation";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const InterfacesDependencies = () => {
  const [interfaceDependancy, setInterfaceDependancy] = useState([]);

  const fetchInterfaceDependancies = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/interfaceDependancies"
      );
      setInterfaceDependancy(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteInterfaceAndDependacy = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `http://localhost:5000/interfaceDependancy/delete/${id}`
          );
          setInterfaceDependancy(
            interfaceDependancy.filter(
              (interfaceDep) => interfaceDep._id !== id
            )
          );
          Swal.fire("Deleted!", "Version Control has been deleted.", "success");
        } catch (error) {
          console.error(error);
          Swal.fire(
            "Error!",
            "There was a problem deleting the record.",
            "error"
          );
        }
      }
    });
  };

  useEffect(() => {
    fetchInterfaceDependancies();
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
      <h1 className="text-3xl mb-5 font-bold text-green-500">
        Context Of The Organization
      </h1>
      <ContextNavigation />
      {/* <div className="bg-sky-50 p-5 mt-8 rounded-xl"> */}
      <div className="flex justify-between items-center mt-10">
        <h1 className="text-2xl font-bold text-blue-900">
          Interfaces and Dependencies
        </h1>
        <Link to="/createInterfaceDependancy">
          <button className="px-3 py-1 bg-[#52B14A] text-white font-semibold rounded-lg">
            Add Details
          </button>
        </Link>
      </div>

      {/* Table */}
      <div className="mt-10 h-full overflow-auto">
        <table className="w-full border-2">
          <thead>
            <tr className="border-2">
              <th className="border-2 px-2">Process Name</th>
              <th className="border-2 px-2">External entity name</th>
              <th className="border-2 px-2">Information Exchanged</th>
              <th className="border-2 px-2">Inworld/Outworld</th>
              <th className="border-2 px-2">Medium</th>
              <th className="border-2 px-2">Exchange method</th>
              <th className="border-2 px-2">Service provided/obtained</th>
              <th className="border-2 px-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {interfaceDependancy.map((interfaceDep) => (
              <tr key={interfaceDep._id}>
                <td className="border-2 p-3">{interfaceDep.processName}</td>
                <td className="border-2 p-3">
                  {interfaceDep.externalEntityName}
                </td>
                <td className="border-2 p-3">
                  {interfaceDep.informationExchanged}
                </td>
                <td className="border-2 p-3">{interfaceDep.inwardOutward}</td>
                <td className="border-2 p-3">{interfaceDep.medium}</td>
                <td className="border-2 p-3">{interfaceDep.exchangeMethod}</td>
                <td className="border-2 p-3">
                  {interfaceDep.serviceProvidedObtained}
                </td>
                <td className="border-2 p-3 flex justify-center">
                  <div className="flex gap-3 items-center">
                    <Link to={`/editInterfaceDependancy/${interfaceDep._id}`}>
                      <button className="p-1 w-20 bg-sky-600 text-white rounded-lg font-semibold">
                        Edit
                      </button>
                    </Link>
                    <button
                      className="p-1 w-20 bg-red-500 text-white rounded-lg"
                      onClick={() =>
                        deleteInterfaceAndDependacy(interfaceDep._id)
                      }
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    // </div>
  );
};

export default InterfacesDependencies;
