import axios from "axios";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { useEffect, useRef, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./custom.css"; // Make sure this imports Tailwind CSS styles properly
import Popping from "./Popping";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const MyCalendar = () => {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({});
  const calendarRef = useRef(null);

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

  const openEventClick = (event) => {
    setSelectedEvent(event);
    setOpen(true);
  };

  const closeEventClick = () => {
    setOpen(false);
  };

  const scrollToCalendar = () => {
    if (calendarRef.current) {
      calendarRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const PrevButton = ({ onClick }) => (
    <button className="custom-prev-button" onClick={onClick}>
      {"<"}
    </button>
  );

  const NextButton = ({ onClick }) => (
    <button className="custom-next-button" onClick={onClick}>
      {">"}
    </button>
  );

  return (
    <div>
      <div className="flex justify-center items-center mt-5" ref={calendarRef}>
        <Popping
          open={open}
          handleClose={closeEventClick}
          event={selectedEvent}
          fetchEvents={fetchEvents}
        />
        {/* <div className="bg-red-500"> */}
        <div className="bg-white shadow-xl rounded-lg p-6 border-3 border-blue-300">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{
              height: 500,
              width: 950,
              fontFamily: "sans-serif",
              fontSize: "16px",
            }}
            onSelectEvent={openEventClick}
            views={["month", "week", "day", "agenda"]}
            components={{
              prev: PrevButton,
              next: NextButton,
            }}
          />
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default MyCalendar;
