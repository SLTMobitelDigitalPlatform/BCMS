import { useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { usePeaksDeadline } from "../../../../hooks/documents/bia/usePeaksDeadline";
import { deleteAlert } from "../../../../utilities/alert";

const PeaksDeadlines = () => {
  const {
    peaksDeadlines,
    loading,
    fetchPeaksDeadlinesByBIAID,
    deletePeaksDeadline,
  } = usePeaksDeadline();

  const { biaid } = useParams();

  useEffect(() => {
    fetchPeaksDeadlinesByBIAID(biaid);
  }, []);

  const handleDelete = async (id) => {
    deleteAlert(
      "Are you sure?",
      "You are about to delete Peaks and Deadline. This action cannot be undone.",
      "Yes, delete it!",
      "Peaks and Deadline deleted successfully!",
      "Error deleting Peaks and Deadline",
      () => deletePeaksDeadline(id, biaid)
    );
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <FaSpinner className="animate-spin text-blue-500 text-3xl" />
      </div>
    );

  return (
    <div className="pt-5 w-full h-full flex flex-col">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-xl font-bold text-indigo-900">
            Business Peaks and Deadlines
        </h1>
        <Link to={`/createPeaksDeadlines/${biaid}`} className="btn-primary">
          Add Details
        </Link>
      </div>

      {/* Table */}
      <div className="h-full w-full overflow-auto">
        <table className="table-fixed w-full">
          <thead className="sticky top-0 bg-indigo-200">
            <tr>
                <th className="border-2 border-black">Name</th>
                <th className="border-2 border-black">Description</th>
                <th className="border-2 border-black">Time of Day</th>
                <th className="border-2 border-black">Day of Week</th>
                <th className="border-2 border-black">Business Day</th>
                <th className="border-2 border-black">Calendar Day</th>
                <th className="border-2 border-black">Month</th>
                <th className="border-2 border-black">Actions</th>
            </tr>
          </thead>
          <tbody>
            {peaksDeadlines.map((peaksDeadlines) => (
              <tr key={peaksDeadlines._id} className="doc-table-hover">
                <td className="py-2 px-4 w-20 doc-table-data text-center">
                  {peaksDeadlines.peaksdeadlineName}
                </td>
                <td className="py-2 px-4 w-20 doc-table-data text-center">
                  {peaksDeadlines.description}
                </td>
                <td className="py-2 px-4 w-36 doc-table-data">
                  {peaksDeadlines.timeOfDay}
                </td>
                <td className="py-2 px-4 w-36 doc-table-data">
                  {peaksDeadlines.dayOfWeek}
                </td>
                <td className="py-2 px-4 w-36 doc-table-data">
                  {peaksDeadlines.businessDay}
                </td>
                <td className="py-2 px-4 w-36 doc-table-data">
                  {peaksDeadlines.calendarDay}
                </td>
                <td className="py-2 px-4 w-36 doc-table-data">
                  {peaksDeadlines.month}
                </td>
                <td className="py-2 px-4 w-28 doc-table-data">
                  <div className="flex justify-center gap-2">
                    <Link
                      to={`/editPeaksDeadlines/${biaid}/${peaksDeadlines._id}`}
                      className="doc-edit-btn"
                    >
                      Edit
                    </Link>
                    <button
                      className="doc-delete-btn"
                      onClick={() => handleDelete(peaksDeadlines._id)}
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

export default PeaksDeadlines;
