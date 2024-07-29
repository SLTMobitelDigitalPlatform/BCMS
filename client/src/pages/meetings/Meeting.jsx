import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Meeting = () => {
  const [meetings, setMeetings] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [meetingToDelete, setMeetingToDelete] = useState(null);

  // Fetch all meetings
  useEffect(() => {
    fetch("http://localhost:5000/meeting/getMeetings")
      .then((res) => res.json())
      .then((data) => {
        setMeetings(data);
      });
  }, []);

  // Delete a meeting
  const handleDelete = (meetingId) => {
    fetch(`http://localhost:5000/meeting/deleteMeeting/${meetingId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        setMeetings(data);
        setShowConfirmation(false); // Hide the confirmation dialog
        setMeetingToDelete(null); // Reset the meeting to delete
        window.location.reload();
      }
    );
  };

  const showDeleteConfirmation = (meetingId) => {
    setMeetingToDelete(meetingId);
    setShowConfirmation(true);
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
    setMeetingToDelete(null);
  };

  return (
    <div className=" border-2 w-full p-5 rounded-2xl ml-96 mt-20 mr-5">
      <div className="flex justify-between">
        <h1 className="mt-5 text-[#52B14A] font-bold text-3xl">Meeting</h1>
        <Link to={"createMeeting"}>
          <button
            type="button"
            className="mt-5 focus:outline-none text-white bg-[#32a3a9] hover:bg-[#26777b] focus:ring-2 focus:ring-emerald-500 font-medium rounded-3xl text-m px-5 py-2.5"
          >
            Create a Meeting
          </button>
        </Link>
      </div>
      <div className="bg-cyan-50 p-3 mt-5 rounded-2xl px-5 border">
      {showConfirmation && (
        <div id="alert-additional-content-1" className="p-4 mb-4 text-red-600 border border-red-300 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800" role="alert">
          <div className="flex items-center">
          </div>
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
        <div className="xl:grid xl:grid-cols-3 gap-10 mt-5">
          {meetings.map((meeting, i) => (
            <div key={i} className="p-6 border border-[#52B14A] rounded-lg shadow-xl bg-white">
              <div className="flex justify-between">
                <h4 className="text-[#003E81]">{meeting.date}</h4>
                <h4 className="text-[#003E81]">
                  {meeting.startTime} - {meeting.endTime}
                </h4>
              </div>
              <div className="text-center mt-5 font-semibold text-lg">
                <h3 className="text-[#003E81]">{meeting.purpose}</h3>
                <h3 className="text-[#52B14A]">{meeting.location}</h3>
              </div>
              <div className="flex justify-between mt-5">
                <Link to={`/meeting/viewMeetings/${meeting._id}`}>
                  <button
                    type="button"
                    className="text-white bg-[#003E81] focus:outline-none focus:ring-2 focus:ring-black font-medium rounded-lg text-sm px-6 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                  >
                    View
                  </button>
                </Link>
                <Link to={`/meeting/updateMeetings/${meeting._id}`}>
                  <button
                    type="button"
                    className="text-white bg-[#52B14A] focus:outline-none focus:ring-2 focus:ring-black font-medium rounded-lg text-sm px-6 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                  >
                    Update
                  </button>
                </Link>
                <button
                  type="button"
                  className="text-white bg-[#B83C31] focus:outline-none focus:ring-2 focus:ring- font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                  onClick={() => showDeleteConfirmation(meeting._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Meeting;
