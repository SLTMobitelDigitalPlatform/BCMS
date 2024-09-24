import axios from "axios";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Swal from "sweetalert2";

const ExternalIssues = () => {
  const [externalIssues, setExternalIssues] = useState([]);
  // const tab = location.state?.tab || "internal";

  const fetchExternalIssues = async () => {
    try {
      const response = await axios.get("http://localhost:5000/externalIssues");
      setExternalIssues(response.data);
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
            `http://localhost:5000/externalIssue/delete/${id}`
          );
          setExternalIssues(
            externalIssues.filter((external) => external._id !== id)
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
    fetchExternalIssues();
  }, []);

  return (
    <div>
      {/* <div className="flex justify-between items-center mb-5">
        <h1 className="text-xl font-bold text-indigo-900">External Issues</h1>

        <div className="flex items-center gap-10">
          <NavLink
            to="/Context-of-the-Organization/issue-register/internalIssues"
            className={({ isActive }) =>
              `px-2 py-1 rounded-lg text-white font-semibold ${
                isActive ? "bg-green-500" : "bg-indigo-900 hover:bg-indigo-600"
              }`
            }
          >
            Internal Issues
          </NavLink>
          <NavLink
            to="/Context-of-the-Organization/issue-register/externalIssues"
            className={({ isActive }) =>
              `px-2 py-1 rounded-lg text-white font-semibold ${
                isActive ? "bg-green-500" : "bg-indigo-900 hover:bg-indigo-600"
              }`
            }
          >
            External Issues
          </NavLink>
        </div>
        <Link to="/createExternalIssue" className="btn-primary font-semibold">
          Create Record
        </Link>
      </div> */}

      {/* Table */}
      <div className="h-full w-full overflow-auto">
        <table className="table-fixed relative w-full py-10 bg-cyan-50">
          <thead className="sticky top-0 bg-indigo-800 text-white doc-table-border">
            <tr>
              <th className="doc-table-border">External Issues</th>
              <th className="doc-table-border">Requirments</th>
              <th className="w-20 doc-table-border">ISMS</th>
              <th className="w-20 doc-table-border">QMS</th>
              <th className="w-20 doc-table-border">BCMS</th>
              <th className="w-32 doc-table-border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {externalIssues.map((external) => (
              <tr key={external._id} className="hover:bg-gray-100">
                <td className="py-2 px-4 doc-table-border">
                  {external.externalIssues}
                </td>
                <td className="py-2 px-4 doc-table-border">
                  {external.requirments}
                </td>
                <td className="py-2 px-4 w-20 text-center font-bold doc-table-border">
                  {external.isms ? "✓" : "✗"}
                </td>
                <td className="py-2 px-4 w-20 text-center font-bold doc-table-border">
                  {external.qms ? "✓" : "✗"}
                </td>
                <td className="py-2 px-4 w-20 text-center font-bold doc-table-border">
                  {external.bcms ? "✓" : "✗"}
                </td>
                <td className="py-2 px-4 w-32 doc-table-border">
                  <div className="flex justify-center gap-2">
                    <Link
                      to={`/editExternalIssues/${external._id}`}
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
      </div>
    </div>
  );
};

export default ExternalIssues;
