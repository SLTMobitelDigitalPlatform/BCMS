import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Objectives = () => {
  const [objectives, setObjectives] = useState([]);

  const fetchObjectives = async () => {
    try {
      const response = await axios.get("http://localhost:5000/objectives");
      setObjectives(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteObjective = async (id) => {
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
          await axios.delete(`http://localhost:5000/objective/delete/${id}`);
          setObjectives(objectives.filter((objective) => objective._id !== id));
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
    fetchObjectives();
  }, []);

  return (
    <div className="pt-5 w-full h-full flex flex-col">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-xl font-bold text-indigo-900">Objectives</h1>
        <Link to="/createObjective" className="btn-primary">
          Add Details
        </Link>
      </div>

      {/* Table */}
      <div className="h-full w-full overflow-auto">
        <table className="table-fixed w-full">
          <thead className="sticky top-0 bg-indigo-200">
            <tr>
              <th className="doc-table-head">Information Security</th>
              <th className="doc-table-head">Business Continuity</th>
              <th className="doc-table-head">Quality</th>
              <th className="w-28 doc-table-head">Actions</th>
            </tr>
          </thead>
          <tbody>
            {objectives.map((objective) => (
              <tr key={objective._id} className="doc-table-hover">
                <td className="py-2 px-4 doc-table-data">
                  {objective.informationSecurity}
                </td>
                <td className="py-2 px-4 doc-table-data">
                  {objective.businessContinuity}
                </td>
                <td className="py-2 px-4 doc-table-data">
                  {objective.quality}
                </td>
                <td className="py-2 px-4 w-28 doc-table-data">
                  <div className="flex justify-center gap-2">
                    <Link
                      to={`/editObjective/${objective._id}`}
                      className="doc-edit-btn"
                    >
                      Edit
                    </Link>
                    <button
                      className="doc-delete-btn"
                      onClick={() => deleteObjective(objective._id)}
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

export default Objectives;
