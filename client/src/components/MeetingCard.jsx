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
        start: new Date(meeting.date),
      }));
      console.log("formattedMeetings:", formattedMeetings);
      const upcomingMeetings = formattedMeetings.filter((meeting) => {
        console.log("Start:", meeting.start);
        return meeting.start > new Date(); // Only upcoming meetings
      });

      setMeetings(upcomingMeetings.sort((a, b) => a.start - b.start)); // Sort by start date
    } catch (error) {
      console.error("Error fetching meetings: ", error);
    }
  };

  return (
    <div className="bg-indigo-900 p-4 w-full h-full rounded-2xl  overflow-hidden">
      {/* <h1 className="text-2xl sm:text-3xl font-bold text-white text-center mb-4">
        Upcoming Meetings
      </h1> */}
      <div className="h-full rounded-2xl overflow-y-auto">
        <div className="flex flex-col gap-4">
          {meetings.length > 0 ? (
            meetings.map((meeting, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                <h2 className="font-bold text-lg text-green-800">
                  {meeting.purpose}
                </h2>
                <div className="flex justify-between items-center text-md text-gray-600">
                  <p>{new Date(meeting.start).toLocaleDateString()}</p>
                  <p>
                    {meeting.startTime} - {meeting.endTime}
                  </p>
                  <p>{meeting.location}</p>
                </div>
                <p className="text-sm text-gray-500"></p>
              </div>
            ))
          ) : (
            <p className="text-black text-center font-semibold">
              No upcoming meetings.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MeetingCard;
