import { useState, useEffect } from "react";
import axios from "axios";

const MeetingCard = () => {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    fetchMeetings();
  }, []);

  const fetchMeetings = async () => {
    try {
      const response = await axios.get("http://localhost:5000/getMeetings");
      console.log("Fetched Meetings:", response.data); // Log fetched meetings

      const meetingArray = Array.isArray(response.data) ? response.data : [];
      const formattedMeetings = meetingArray.map((meeting) => ({
        ...meeting,
        start: new Date(meeting.startTime), // Ensure this matches your API response
        end: new Date(meeting.endTime), // Ensure this matches your API response
      }));

      const upcomingMeetings = formattedMeetings.filter((meeting) => {
        console.log(
          "Checking meeting:",
          meeting.title,
          "Start:",
          meeting.start
        );
        return meeting.start > new Date(); // Only upcoming meetings
      });

      setMeetings(upcomingMeetings.sort((a, b) => a.start - b.start)); // Sort by start date
    } catch (error) {
      console.error("Error fetching meetings: ", error);
    }
  };

  return (
    <div className="bg-green-100 p-4 w-full h-full rounded-2xl overflow-y-auto">
      <h1 className="text-2xl sm:text-3xl font-bold text-green-600 text-center mb-4">
        Upcoming Meetings
      </h1>
      <div className="flex flex-col gap-4">
        {meetings.length > 0 ? (
          meetings.map((meeting, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
              <h2 className="font-bold text-lg text-green-800">
                {meeting.title}
              </h2>
              <p className="text-md text-gray-600">
                {new Date(meeting.start).toLocaleDateString()} -{" "}
                {new Date(meeting.end).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500">{meeting.description}</p>
            </div>
          ))
        ) : (
          <p className="text-black text-center font-semibold">
            No upcoming meetings.
          </p>
        )}
      </div>
    </div>
  );
};

export default MeetingCard;
