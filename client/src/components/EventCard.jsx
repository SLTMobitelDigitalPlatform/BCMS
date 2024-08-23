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
      console.log("Fetched events:", response.data);

      const eventArray = Array.isArray(response.data) ? response.data : [];

      const formattedEvents = eventArray.map((event) => ({
        ...event,
        start: new Date(event.start),
        end: new Date(event.end),
      }));

      setEvents(formattedEvents);
    } catch (error) {
      console.error("Error fetching events: ", error);
    }
  };

  return (
    <div className="bg-cyan-100 h-full p-4 w-full rounded-2xl overflow-y-auto md:ml-2">
      <h1 className="text-2xl sm:text-3xl font-bold text-blue-500 text-center mb-8">
        Upcoming Events
      </h1>
      <div className="flex flex-col gap-4">
        {events.length > 0 ? (
          events.map((event, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
              <h2 className="font-bold text-lg text-blue-800">{event.title}</h2>
              <p className="text-md text-gray-600">
                {new Date(event.start).toLocaleDateString()} -{" "}
                {new Date(event.end).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500">{event.description}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center">No events found.</p>
        )}
      </div>
    </div>
  );
};

export default EventCard;

{
  /* <div className="h-full overflow-y-auto p-4">
      <h2 className="text-lg font-semibold mb-4 text-center">
        Upcoming Events
      </h2>
      <div className="space-y-4">
        {events.map((event, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-lg flex flex-col space-y-2"
          >
            <h3 className="text-lg font-semibold text-blue-900">
              {event.title}
            </h3>
            <p className="text-sm text-gray-700">
              {event.start.toLocaleDateString()} -{" "}
              {event.end.toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-500">{event.description}</p>
          </div>
        ))}
      </div>
    </div> */
}
