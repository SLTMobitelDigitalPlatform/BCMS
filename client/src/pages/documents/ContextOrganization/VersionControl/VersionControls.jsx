import { useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useVersionControl } from "../../../../hooks/documents/Context of the Organization/useVersionControl";
import { deleteAlert } from "../../../../utilities/alert";

const VersionControls = () => {
  // const [versionControls, setVersionControls] = useState([]);

  const {
    versionControls,
    loading,
    fetchVersionControls,
    deleteVersionControl,
  } = useVersionControl();

  // const fetchVersionControls = async () => {
  //   try {
  //     const response = await axios.get(
  //       "http://localhost:5000/api/versionControls/"
  //     );
  //     setVersionControls(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    fetchVersionControls();
  }, []);

  // Delete a risk with SweetAlert2 confirmation
  const handleDelete = async (id, serialNo, versionNo) => {
    deleteAlert(
      "Are you sure?",
      `You are about to delete "${serialNo} - ${versionNo}" Version Control. This action cannot be undone.`,
      "Yes, delete it!",
      `"${serialNo} - ${versionNo}" Version Control deleted successfully!`,
      "Error deleting Version Control",
      () => deleteVersionControl(id)
    );
    // Swal.fire({
    //   title: "Are you sure?",
    //   text: "You won't be able to revert this!",
    //   icon: "warning",
    //   showCancelButton: true,
    //   confirmButtonColor: "#3085d6",
    //   cancelButtonColor: "#d33",
    //   confirmButtonText: "Yes, delete it!",
    // }).then(async (result) => {
    //   if (result.isConfirmed) {
    //     try {
    //       await axios.delete(
    //         `http://localhost:5000/api/versionControls/delete/${id}`
    //       );
    //       setVersionControls(
    //         versionControls.filter(
    //           (versionControl) => versionControl._id !== id
    //         )
    //       );
    //       Swal.fire("Deleted!", "Version Control has been deleted.", "success");
    //     } catch (error) {
    //       console.error(error);
    //       Swal.fire(
    //         "Error!",
    //         "There was a problem deleting the record.",
    //         "error"
    //       );
    //     }
    //   }
    // });
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <FaSpinner className="animate-spin text-blue-500 text-3xl" />
      </div>
    );

  return (
    <div className=" pt-4 pb-16 w-full h-full overflow-hidden">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-xl font-bold text-indigo-900">Version Control</h1>
        <Link to="/createVersion" className="btn-primary font-semibold">
          Create Version Control
        </Link>
      </div>

      {/* Table */}
      <div className="h-full w-full overflow-auto">
        <table className="table-fixed relative w-full py-10 bg">
          <thead className="sticky top-0 bg-indigo-100 doc-table-border">
            <tr>
              <th className="w-20 doc-table-head">Serial Number</th>
              <th className="w-20 doc-table-head">Version Number</th>
              <th className="w-48 doc-table-head">Prepared By</th>
              <th className="w-48 doc-table-head">Checked By</th>
              <th className="w-48 doc-table-head">Approved By</th>
              <th className="w-36 doc-table-head">Reasons for new release</th>
              <th className="w-36 doc-table-head">Approval Status</th>
              <th className="w-28 doc-table-head">Actions</th>
            </tr>
          </thead>
          <tbody>
            {versionControls.map((v) => (
              <tr key={v._id} className="hover:bg-gray-100">
                <td className="py-2 px-4 w-20 doc-table-data text-center">
                  {v.serialNo}
                </td>
                <td className="py-2 px-4 w-20 doc-table-data text-center">
                  {v.versionNo}
                </td>
                <td className="py-2 px-4 w-48 doc-table-data">{v.prepare}</td>
                <td className="py-2 px-4 w-48 doc-table-data">{v.checkedBy}</td>
                <td className="py-2 px-4 w-48 doc-table-data">{v.approve}</td>
                <td className="py-2 px-4 w-36 doc-table-data">{v.reasons}</td>
                <td className="py-2 px-4 w-36 doc-table-data">
                  {v.isApproved}
                </td>
                <td className="py-2 px-4 w-28 doc-table-data">
                  <div className="flex justify-center gap-2">
                    <Link to={`/editVersion/${v._id}`} className="doc-edit-btn">
                      Edit
                    </Link>
                    <button
                      className="doc-delete-btn"
                      onClick={() =>
                        handleDelete(v._id, v.serialNo, v.versionNo)
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
  );
};

export default VersionControls;
