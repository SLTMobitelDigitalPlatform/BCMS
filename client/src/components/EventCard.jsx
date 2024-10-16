import { useState, useEffect } from "react";
import axios from "axios";

const EventCard = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/events");
      const eventArray = Array.isArray(response.data) ? response.data : [];

      const formattedEvents = eventArray
        .map((event) => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
        }))
        .filter((event) => event.start >= new Date()) // Only upcoming events
        .sort((a, b) => a.start - b.start); // Sort events by start date

      setEvents(formattedEvents);
    } catch (error) {
      console.error("Error fetching events: ", error);
    }
  };

  return (
    <div className="bg-indigo-900 p-4 w-full h-full rounded-2xl overflow-hidden">
      {/* <h1 className="text-2xl sm:text-3xl font-bold text-white text-center mb-4">
        Upcoming Events
      </h1> */}
      <div className="h-full rounded-2xl overflow-y-auto">
        <div className="flex flex-col gap-4">
          {events.length > 0 ? (
            events.map((event, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                <h2 className="font-bold text-lg text-blue-800">
                  {event.title}
                </h2>
                <p className="text-md text-gray-600 font-semibold">
                  {new Date(event.start).toLocaleDateString()} -{" "}
                  {new Date(event.end).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500">{event.description}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center">No upcoming events.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
