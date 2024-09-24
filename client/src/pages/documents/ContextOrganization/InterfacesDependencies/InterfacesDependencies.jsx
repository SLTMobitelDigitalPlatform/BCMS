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
    <div className="px-5 pt-4 pb-16 w-full h-full overflow-hidden">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-xl font-bold text-indigo-900">
          Interfaces and Dependencies
        </h1>
        <Link
          to="/createInterfaceDependancy"
          className="btn-primary font-semibold"
        >
          Add Details
        </Link>
      </div>

      {/* Table */}
      <div className="h-full w-full overflow-auto">
        <table className="table-fixed relative w-full py-10 bg-cyan-50">
          <thead className="sticky top-0 bg-indigo-800 text-white doc-table-border">
            <tr>
              <th className="doc-table-border">Process Name</th>
              <th className="doc-table-border">External entity name</th>
              <th className="doc-table-border">Information Exchanged</th>
              <th className="w-30 doc-table-border">Inward/ Outward</th>
              <th className="w-30 doc-table-border">Medium</th>
              <th className="doc-table-border">Exchange method</th>
              <th className="w-24 doc-table-border">
                Service provided/ obtained
              </th>
              <th className="w-28 doc-table-border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {interfaceDependancy.map((interfaceDep) => (
              <tr key={interfaceDep._id} className="hover:bg-gray-100">
                <td className="py-2 px-4 doc-table-border">
                  {interfaceDep.processName}
                </td>
                <td className="py-2 px-4 doc-table-border">
                  {interfaceDep.externalEntityName}
                </td>
                <td className="py-2 px-4 doc-table-border">
                  {interfaceDep.informationExchanged}
                </td>
                <td className="py-2 px-1 doc-table-border text-center">
                  {interfaceDep.inwardOutward}
                </td>
                <td className="py-2 px-4 doc-table-border">
                  {interfaceDep.medium}
                </td>
                <td className="py-2 px-4 doc-table-border">
                  {interfaceDep.exchangeMethod}
                </td>
                <td className="py-2 px-4 w-24 doc-table-border text-center">
                  {interfaceDep.serviceProvidedObtained}
                </td>
                <td className="py-2 px-4 w-28 doc-table-border">
                  <div className="flex justify-center gap-2">
                    <Link
                      to={`/editInterfaceDependancy/${interfaceDep._id}`}
                      className="doc-edit-btn"
                    >
                      Edit
                    </Link>
                    <button
                      className="doc-delete-btn"
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
