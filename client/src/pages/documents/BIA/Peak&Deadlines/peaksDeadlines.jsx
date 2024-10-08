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
                <th className="w-20 doc-table-head">Name</th>
                <th className="w-36 doc-table-head">Description</th>
                <th className="w-12 doc-table-head">Time of Day</th>
                <th className="w-12 doc-table-head">Day of Week</th>
                <th className="w-12 doc-table-head">Business Day</th>
                <th className="w-12 doc-table-head">Calendar Day</th>
                <th className="w-12 doc-table-head">Month</th>
                <th className="w-16 doc-table-head">Actions</th>
            </tr>
          </thead>
          <tbody>
            {peaksDeadlines.map((peaksDeadlines) => (
              <tr key={peaksDeadlines._id} className="doc-table-hover">
                <td className="py-2 px-4 w-20 doc-table-data">
                  {peaksDeadlines.peaksdeadlineName}
                </td>
                <td className="py-2 px-4 w-28 doc-table-data">
                  {peaksDeadlines.description}
                </td>
                <td className="py-2 px-4 w-16 doc-table-data text-center">
                  {peaksDeadlines.timeOfDay}
                </td>
                <td className="py-2 px-4 w-16 doc-table-data text-center">
                  {peaksDeadlines.dayOfWeek}
                </td>
                <td className="py-2 px-4 w-16 doc-table-data text-center">
                  {peaksDeadlines.businessDay}
                </td>
                <td className="py-2 px-4 w-16 doc-table-data text-center">
                  {peaksDeadlines.calendarDay}
                </td>
                <td className="py-2 px-4 w-16 doc-table-data text-center">
                  {peaksDeadlines.month}
                </td>
                <td className="py-2 px-4 w-20 doc-table-data text-center">
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
