import axios from "axios";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Swal from "sweetalert2";

const InternalParty = () => {
  const [internalParty, setInternalParty] = useState([]);

  const fetchInternalParty = async () => {
    try {
      const response = await axios.get("http://localhost:5000/internalParty");
      setInternalParty(response.data);
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
            `http://localhost:5000/internalParty/delete/${id}`
          );
          setInternalParty(
            internalParty.filter((internal) => internal._id !== id)
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
    fetchInternalParty();
  }, []);

  return (
    <table className="table-fixed w-full">
      <thead className="sticky top-0 bg-indigo-200">
        <tr>
          <th className="doc-table-head">Internal Party</th>
          <th className="doc-table-head">Requirments</th>

          <th className="w-32 doc-table-head">Actions</th>
        </tr>
      </thead>
      <tbody>
        {internalParty.map((internal) => (
          <tr key={internal._id} className="doc-table-hover">
            <td className="py-2 px-4 doc-table-data">
              {internal.internalParty}
            </td>
            <td className="py-2 px-4 doc-table-data">{internal.requirments}</td>

            <td className="py-2 px-4 w-32 doc-table-data">
              <div className="flex justify-center gap-2">
                <Link
                  to={`/editInternalParty/${internal._id}`}
                  state={{ activeTab: "internalParty" }}
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
  );
};

export default InternalParty;
