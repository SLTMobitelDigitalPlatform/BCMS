import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import axios from "axios";

const Meeting = () => {
  const [meetings, setMeetings] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [meetingToDelete, setMeetingToDelete] = useState(null);
  const [user, setUser] = useState(null);

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
    // console.log(user.role);
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
        setShowConfirmation(false); // Hide the confirmation dialog
        setMeetingToDelete(null); // Reset the meeting to delete
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

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <div className="flex gap-x-4">
        <Sidebar />
        <div className=" border-2 w-full p-5 rounded-2xl ml-10 mt- mr-10">
          <div className="flex justify-between">
            <h1 className="mt-5 text-[#52B14A] font-bold text-3xl">Meeting</h1>

            {user &&
            (user.role === "Super Admin" ||
              user.role === "Secretariat Coordinator") ? (
              <Link to={"createMeeting"}>
                <button
                  type="button"
                  className="mt-5 focus:outline-none text-white bg-[#32a3a9] hover:bg-[#26777b] focus:ring-2 focus:ring-emerald-500 font-medium rounded-3xl text-m px-5 py-2.5"
                >
                  Create a Meeting
                </button>
              </Link>
            ) : (
              " "
            )}
          </div>
          <div className="bg-cyan-50 p-3 mt-5 rounded-2xl px-5 border">
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

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-[#52B14A]">
                <thead className="bg-[#003E81] text-white">
                  <tr>
                    <th className="py-2 px-4">Date</th>
                    <th className="py-2 px-4">Start Time</th>
                    <th className="py-2 px-4">End Time</th>
                    <th className="py-2 px-4">Purpose</th>
                    <th className="py-2 px-4">Location</th>
                    <th className="py-2 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {meetings.map((meeting, i) => (
                    <tr key={i} className="border-b">
                      <td className="py-2 px-4 text-[#003E81]">
                        {meeting.date}
                      </td>
                      <td className="py-2 px-4 text-[#003E81]">
                        {meeting.startTime}
                      </td>
                      <td className="py-2 px-4 text-[#003E81]">
                        {meeting.endTime}
                      </td>
                      <td className="py-2 px-4 text-[#003E81]">
                        {meeting.purpose}
                      </td>
                      <td className="py-2 px-4 text-[#52B14A]">
                        {meeting.location}
                      </td>
                      <td className="py-2 px-4 flex space-x-2">
                        <Link to={`/meeting/viewMeetings/${meeting._id}`}>
                          <button
                            type="button"
                            className="text-white bg-[#003E81] focus:outline-none focus:ring-2 focus:ring-black font-medium rounded-lg text-sm px-4 py-2"
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
                              className="text-white bg-green-500 focus:outline-none focus:ring-2 focus:ring-black font-medium rounded-lg text-sm px-4 py-2"
                            >
                              {/* [#52B14A] */}
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
                            className="text-white bg-red-600 focus:outline-none focus:ring-2 focus:ring-black font-medium rounded-lg text-sm px-4 py-2"
                            onClick={() => showDeleteConfirmation(meeting._id)}
                          >
                            Delete
                          </button>
                        ) : (
                          " "
                        )}{" "}
                        {/* [#B83C31] */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Meeting;
