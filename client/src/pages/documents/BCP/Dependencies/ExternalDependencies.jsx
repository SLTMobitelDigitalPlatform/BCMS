import axios from "axios";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Swal from "sweetalert2";

const ExternalDependencies = () => {
  const [externalDependencies, setExternalDependencies] = useState([]);

  const fetchExternalDependencies = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/externalDependencies"
      );
      setExternalDependencies(response.data);
      // console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteInternal = async (id) => {
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
            `http://localhost:5000/externalDependencies/delete/${id}`
          );
          setExternalDependencies(
            externalDependencies.filter((external) => external._id !== id)
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
    fetchExternalDependencies();
  }, []);

  return (
    <div className="pt-5 w-full h-full flex flex-col">
      {/* <div className="flex justify-between items-center mb-5">
        <h1 className="text-xl font-bold text-blue-900">Internal Party</h1>

        <div className="flex items-center gap-10">
          <NavLink
            to="/Context-of-the-Organization/interseted-parties/external-party"
            className={({ isActive }) =>
              `px-2 py-1 rounded-lg text-white font-semibold ${
                isActive ? "bg-green-500" : "bg-indigo-900 hover:bg-indigo-600"
              }`
            }
          >
            Internal Party
          </NavLink>
          <NavLink
            to="/Context-of-the-Organization/interseted-parties/external-party"
            className={({ isActive }) =>
              `px-2 py-1 rounded-lg text-white font-semibold ${
                isActive ? "bg-green-500" : "bg-indigo-900 hover:bg-indigo-600"
              }`
            }
          >
            External Party
          </NavLink>
        </div>
        <Link to="/createExternalDependencies" className="btn-primary font-semibold">
          Create Record
        </Link>
      </div>
      {/* <div className="mt-5">
        <h1 className="text-center text-2xl font-bold mb-3">Internal Issues</h1>
      </div> */}

      {/* Table */}
      <div className="h-full w-full overflow-auto">
        <table className="table-fixed w-full">
          <thead className="sticky top-0 bg-indigo-200">
            <tr>
              <th className="w-52 doc-table-head">
                Critical Business Function
              </th>
              <th className="doc-table-head">Organization</th>
              <th className="w-32 doc-table-head">Dependencies</th>
              <th className="w-32 doc-table-head">Primary Contact</th>
              <th className="w-32 doc-table-head">Secondary Contact</th>
              <th className="w-32 doc-table-head">Justification</th>
            </tr>
          </thead>
          <tbody>
            {externalDependencies.map((external) => (
              <tr key={external._id} className="doc-table-hover">
                <td className="py-2 px-4 doc-table-data">
                  {external.externalDependencies}
                </td>
                <td className="py-2 px-4 doc-table-data">
                  {external.requirments}
                </td>

                <td className="py-2 px-4 w-32 doc-table-data">
                  <div className="flex justify-center gap-2">
                    <Link
                      to={`/editExternalDependencies/${external._id}`}
                      state={{ activeTab: "externalDependencies" }}
                      className="doc-edit-btn"
                    >
                      Edit
                    </Link>
                    <button
                      className="doc-delete-btn"
                      onClick={() => deleteInternal(external._id)}
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
  );
};

export default ExternalDependencies;
