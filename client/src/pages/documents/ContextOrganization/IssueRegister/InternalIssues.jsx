import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ContextNavigation from "../../../../components/ContextNavigation";
import Swal from "sweetalert2";

const InternalIssues = () => {
  const [internalIssues, setInternalIssues] = useState([]);

  const fetchInternalIssues = async () => {
    try {
      const response = await axios.get("http://localhost:5000/internalIssues");
      setInternalIssues(response.data);
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
            `http://localhost:5000/internalIssue/delete/${id}`
          );
          setInternalIssues(
            internalIssues.filter((internal) => internal._id !== id)
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
    fetchInternalIssues();
  }, []);

  return (
    <div className="w-full h-full p-5 flex flex-col bg-sky-100 rounded-2xl">
      <h1 className="text-3xl mb-5 font-bold text-green-500">
        Context Of The Organization
      </h1>
      <ContextNavigation />
      {/* <div className="bg-sky-50 p-5 mt-8 rounded-xl"> */}
      <div className="flex justify-between items-center mt-10">
        <div className="flex items-center gap-10">
          <h1 className="text-2xl font-bold text-blue-900">Issue Register</h1>
          <Link to="/internalIssues">
            <button className="px-3 py-1 border-2 border-sky-600 text-sky-600 hover:text-[#52B14A] hover:border-[#52B14A] font-semibold rounded-lg">
              Internal Issues
            </button>
          </Link>
          <Link to="/externalIssues">
            <button className="px-3 py-1 border-2 border-sky-600 text-sky-600 hover:text-[#52B14A] hover:border-[#52B14A] font-semibold rounded-lg">
              External Issues
            </button>
          </Link>
        </div>
        <Link to="/createInternalIssue">
          <button className="px-3 py-1 bg-[#52B14A] text-white font-semibold rounded-lg">
            Create Record
          </button>
        </Link>
      </div>
      <div className="mt-5">
        <h1 className="text-center text-2xl font-bold mb-3">Internal Issues</h1>
      </div>

      {/* Table */}
      <div className="mt-10 w-full h-full overflow-auto">
        <table className="w-full border-2">
          <thead>
            <tr className="border-2">
              <th className="border-2">Internal Issues</th>
              <th className="border-2">Requirments</th>
              <th className="border-2">ISMS</th>
              <th className="border-2">QMS</th>
              <th className="border-2">BCMS</th>
              <th className="border-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {internalIssues.map((internal) => (
              <tr key={internal._id}>
                <td className="border-2 p-3">{internal.internalIssues}</td>
                <td className="border-2 p-3">{internal.requirments}</td>
                <td className="border-2 p-3">{internal.isms ? "✓" : "✗"}</td>
                <td className="border-2 p-3">{internal.qms ? "✓" : "✗"}</td>
                <td className="border-2 p-3">{internal.bcms ? "✓" : "✗"}</td>
                <td className="border-2 p-3 flex justify-center">
                  <div className="flex gap-3 items-center">
                    <Link to={`/editInternalIssues/${internal._id}`}>
                      <button className="p-1 w-20 bg-sky-600 text-white rounded-lg font-semibold">
                        Edit
                      </button>
                    </Link>
                    <button
                      className="p-1 w-20 bg-red-500 text-white rounded-lg"
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
    // </div>
    // </div>
  );
};

export default InternalIssues;
