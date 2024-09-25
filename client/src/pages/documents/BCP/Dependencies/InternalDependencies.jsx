import axios from "axios";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Swal from "sweetalert2";

const InternalDependencies = () => {
  const [internalDependencies, setInternalDependencies] = useState([]);

  const fetchInternalDependencies = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/internalDependencies"
      );
      setInternalDependencies(response.data);
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
            `http://localhost:5000/internalDependencies/delete/${id}`
          );
          setInternalDependencies(
            internalDependencies.filter((internal) => internal._id !== id)
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
    fetchInternalDependencies();
  }, []);

  return (
    <div className="px-5 pt-4 pb-16 w-full h-full overflow-hidden">
      {/* <div className="flex justify-between items-center mb-5">
        <h1 className="text-xl font-bold text-blue-900">Internal Party</h1>

        <div className="flex items-center gap-10">
          <NavLink
            to="/Context-of-the-Organization/interseted-parties/internal-party"
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
        <Link to="/createInternalDependencies" className="btn-primary font-semibold">
          Create Record
        </Link>
      </div>
      {/* <div className="mt-5">
        <h1 className="text-center text-2xl font-bold mb-3">Internal Issues</h1>
      </div> */}

      {/* Table */}
      <div className="h-full w-full overflow-auto">
        <table className="table-fixed relative w-full py-10 bg-cyan-50">
          <thead className="sticky top-0 bg-indigo-800 text-white doc-table-border">
            <tr>
              <th className="doc-table-border">Internal Party</th>
              <th className="doc-table-border">Requirments</th>

              <th className="w-32 doc-table-border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {internalDependencies.map((internal) => (
              <tr key={internal._id} className="doc-table-hover">
                <td className="py-2 px-4 doc-table-border">
                  {internal.internalDependencies}
                </td>
                <td className="py-2 px-4 doc-table-border">
                  {internal.requirments}
                </td>

                <td className="py-2 px-4 w-32 doc-table-border">
                  <div className="flex justify-center gap-2">
                    <Link
                      to={`/editInternalDependencies/${internal._id}`}
                      state={{ activeTab: "internalDependencies" }}
                      className="doc-edit-btn"
                    >
                      Edit
                    </Link>
                    <button
                      className="doc-delete-btn"
                      onClick={() => deleteInternal(internal._id)}
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

export default InternalDependencies;
