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
    <table className="table-fixed w-full">
      <thead className="sticky top-0 bg-indigo-200">
        <tr>
          <th className="doc-table-head">External Party</th>
          <th className="doc-table-head">Requirments</th>

          <th className="w-32 doc-table-head">Actions</th>
        </tr>
      </thead>
      <tbody>
        {externalParty.map((external) => (
          <tr key={external._id} className="doc-table-hover">
            <td className="py-2 px-4 doc-table-data">
              {external.externalParty}
            </td>
            <td className="py-2 px-4 doc-table-data">{external.requirments}</td>

            <td className="py-2 px-4 w-32 doc-table-data">
              <div className="flex justify-center gap-2">
                <Link
                  to={`/editExternalParty/${external._id}`}
                  state={{ activeTab: "external" }}
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
  );
};

export default ExternalParty;
