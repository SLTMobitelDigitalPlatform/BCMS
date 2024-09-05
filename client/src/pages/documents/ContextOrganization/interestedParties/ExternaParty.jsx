import axios from "axios";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Swal from "sweetalert2";

const ExternalParty = () => {
  const [externalParty, setExternalParty] = useState([]);

  const fetchExternalParty = async () => {
    try {
      const response = await axios.get("http://localhost:5000/externalParty");
      setExternalParty(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteExternal = async (id) => {
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
            `http://localhost:5000/externalParty/delete/${id}`
          );
          setExternalParty(
            externalParty.filter((external) => external._id !== id)
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
    fetchExternalParty();
  }, []);

  return (
    <div className="px-5 pt-4 pb-16 w-full h-full overflow-hidden">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-xl font-bold text-indigo-900">External Parties</h1>

        <div className="flex items-center gap-10">
          <NavLink
            to="/Context-of-the-Organization/externalParty"
            className={({ isActive }) =>
              `px-2 py-1 rounded-lg text-white font-semibold ${
                isActive ? "bg-green-500" : "bg-indigo-900 hover:bg-indigo-600"
              }`
            }
          >
            External Party
          </NavLink>
          <NavLink
            to="/Context-of-the-Organization/internalParty"
            className={({ isActive }) =>
              `px-2 py-1 rounded-lg text-white font-semibold ${
                isActive ? "bg-green-500" : "bg-indigo-900 hover:bg-indigo-600"
              }`
            }
          >
            Internal Party
          </NavLink>
        </div>
        <Link to="/createExternalParty" className="btn-primary font-semibold">
          Create Record
        </Link>
      </div>
      {/* <div className="mt-5">
        <h1 className="text-center text-2xl font-bold mb-3">External Issues</h1>
      </div> */}

      {/* Table */}
      <div className="h-full w-full overflow-auto">
        <table className="table-fixed relative w-full py-10 bg-cyan-50">
          <thead className="sticky top-0 bg-indigo-800 text-white doc-table-border">
            <tr>
              <th className="doc-table-border">External Party</th>
              <th className="doc-table-border">Requirments</th>

              <th className="w-32 doc-table-border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {externalParty.map((external) => (
              <tr key={external._id} className="hover:bg-indigo-100">
                <td className="py-2 px-4 doc-table-border">
                  {external.externalParty}
                </td>
                <td className="py-2 px-4 doc-table-border">
                  {external.requirments}
                </td>

                <td className="py-2 px-4 w-32 doc-table-border">
                  <div className="flex justify-center gap-2">
                    <Link
                      to={`/editExternalParty/${external._id}`}
                      className="doc-edit-btn"
                    >
                      Edit
                    </Link>
                    <button
                      className="doc-delete-btn"
                      onClick={() => deleteExternal(external._id)}
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

export default ExternalParty;
