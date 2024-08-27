import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";

const Meeting = () => {
  const [meetings, setMeetings] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [meetingToDelete, setMeetingToDelete] = useState(null);
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // Fetch all meetings
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get("http://localhost:5000/currentuser", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    const fetchMeetings = async () => {
      try {
        const response = await fetch("http://localhost:5000/getMeetings");
        const data = await response.json();
        setMeetings(data);
      } catch (error) {
        console.error("Error fetching meetings data:", error);
      }
    };

    fetchUserDetails();
    fetchMeetings();
  }, []);

  // Delete a meeting
  const handleDelete = (meetingId) => {
    fetch(`http://localhost:5000/deleteMeeting/${meetingId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        setMeetings(data);
        setShowConfirmation(false);
        setMeetingToDelete(null);
        window.location.reload();
      });
  };

  const showDeleteConfirmation = (meetingId) => {
    setMeetingToDelete(meetingId);
    setShowConfirmation(true);
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
    setMeetingToDelete(null);
  };

  // Pagination logic
  const totalPages = Math.ceil(meetings.length / itemsPerPage);
  const paginatedMeetings = meetings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="h-full overflow-y-auto">
      <div className="flex justify-between">
        <h1 className="topic">Meeting</h1>

        {user &&
        (user.role === "Super Admin" ||
          user.role === "Secretariat Coordinator") ? (
          <Link to={"createMeeting"}>
            <button
              type="button"
              className="btn-primary px-6 py-2 rounded-xl text-white font-medium"
            >
              Create a Meeting
            </button>
          </Link>
        ) : (
          " "
        )}
      </div>

      {showConfirmation && (
        <div
          id="alert-additional-content-1"
          className="p-4 mb-4 text-red-600 border border-red-300 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800"
          role="alert"
        >
          <div className="flex items-center"></div>
          <div className="mt-2 mb-4 text-2xl font-bold text-center">
            Please confirm that you want to delete this meeting
          </div>
          <div className="flex justify-center items-center">
            <button
              type="button"
              className="text-white bg-red-800 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-red-200 font-semibold rounded-lg text-xl px-5 py-2 me-2 text-center inline-flex items-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              onClick={() => handleDelete(meetingToDelete)}
            >
              Yes, Delete
            </button>
            <button
              type="button"
              className="text-red-800 bg-transparent border border-red-800 hover:bg-red-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-200 font-semibold rounded-lg text-xl px-5 py-2 text-center dark:hover:bg-red-600 dark:border-red-600 dark:text-red-400 dark:hover:text-white dark:focus:ring-red-800"
              data-dismiss-target="#alert-additional-content-1"
              aria-label="Close"
              onClick={cancelDelete}
            >
              No, Keep
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto mt-5">
        <table className="min-w-full bg-white border border-green-500 border-collapse">
          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="py-2 px-4 border border-green-500">Date</th>
              <th className="py-2 px-4 border border-green-500">Start Time</th>
              <th className="py-2 px-4 border border-green-500">End Time</th>
              <th className="py-2 px-4 border border-green-500">Purpose</th>
              <th className="py-2 px-4 border border-green-500">Location</th>
              <th className="py-2 px-4 border border-green-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedMeetings.map((meeting, i) => (
              <tr key={i} className="border-b">
                <td className="py-2 px-4 w-32 text-[#003E81] border border-green-500">
                  {meeting.date}
                </td>
                <td className="py-2 px-4 w-28 text-[#003E81] border border-green-500">
                  {meeting.startTime}
                </td>
                <td className="py-2 px-4 w-28 text-[#003E81] border border-green-500">
                  {meeting.endTime}
                </td>
                <td className="py-2 px-4 w-56 text-[#003E81] border border-green-500">
                  {meeting.purpose}
                </td>
                <td className="py-2 px-4 w-32 text-[#003E81] border border-green-500">
                  {meeting.location}
                </td>
                <td className="border border-green-500 py-2 px-4 w-60">
                  <div className="flex justify-between">
                    <Link to={`/meeting/viewMeetings/${meeting._id}`}>
                      <button
                        type="button"
                        className="text-white bg-blue-900 focus:outline-none focus:ring-2 focus:ring-black font-medium rounded-lg text-sm px-3 py-2"
                      >
                        View
                      </button>
                    </Link>
                    {user &&
                    (user.role === "Super Admin" ||
                      user.role === "Secretariat Coordinator") ? (
                      <Link to={`/meeting/updateMeetings/${meeting._id}`}>
                        <button
                          type="button"
                          className="text-white bg-green-500 focus:outline-none focus:ring-2 focus:ring-black font-medium rounded-lg text-sm px-3 py-2"
                        >
                          Update
                        </button>
                      </Link>
                    ) : (
                      " "
                    )}{" "}
                    {user &&
                    (user.role === "Super Admin" ||
                      user.role === "Secretariat Coordinator") ? (
                      <button
                        type="button"
                        className="text-white bg-red-600 focus:outline-none focus:ring-2 focus:ring-black font-medium rounded-lg text-sm px-3 py-2"
                        onClick={() => showDeleteConfirmation(meeting._id)}
                      >
                        Delete
                      </button>
                    ) : (
                      " "
                    )}{" "}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Meeting;
