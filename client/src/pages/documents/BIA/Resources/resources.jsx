import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const PeaksAndDeadlines = () => {
  const [peaksAndDeadlines, setPeaksAndDeadlines] = useState([]);

  const fetchPeaksAndDeadlines = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/peaksAndDeadlines/"
      );
      setPeaksAndDeadlines(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPeaksAndDeadlines();
  }, []);

  // Delete a risk with SweetAlert2 confirmation
  const deleteVersionControl = async (id) => {
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
            `http://localhost:5000/api/peaksAndDeadlines/delete/${id}`
          );
          setPeaksAndDeadlines(
            peaksAndDeadlines.filter(
              (versionControl) => versionControl._id !== id
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

  return (
    <div className="bia-container w-full h-full bg-sky-100 flex flex-col rounded-2xl ">
      <div className="p-5 h-full bg-sky-100 rounded-2xl mt-5">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-900">Resources</h1>
          <Link to="/createVersion">
            <button className="btn-primary">Add</button>
          </Link>
        </div>

        {/* Table */}
        <div className="mt-5 h-full overflow-auto">
          <table className="relative w-full h-full bg-cyan-50">
            <thead className="sticky top-0 bg-white">
              <tr>
                <th className="border-2 border-black">Name</th>
                <th className="border-2 border-black">Alternate Name</th>
                <th className="border-2 border-black">RTO</th>
                <th className="border-2 border-black">RPO</th>
              </tr>
            </thead>
            <tbody>
              {peaksAndDeadlines.map((v) => (
                <tr key={v.id}>
                  <td className="p-3 border-2 border-black">{v.serialNo}</td>
                  <td className="p-3 border-2 border-black">{v.versionNo}</td>
                  <td className="p-3 border-2 border-black">{v.prepare}</td>
                  <td className="p-3 border-2 border-black">{v.approve}</td>
                  <td className="p-3 border-2 border-black w-96">
                    {v.reasons}
                  </td>
                  <td className="border-2 border-black ">
                    <div className="flex justify-center items-center gap-3">
                      <Link to={`/editVersion/${v._id}`}>
                        <button className="px-1 bg-blue-500 text-white rounded">
                          Edit
                        </button>
                      </Link>
                      <button
                        className="px-1 bg-red-500 text-white rounded"
                        onClick={() => deleteVersionControl(v._id)}
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
    </div>
    // </div>
  );
};

export default PeaksAndDeadlines ;
