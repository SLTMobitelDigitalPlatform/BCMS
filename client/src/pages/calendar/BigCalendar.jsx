import React, { useEffect, useState, useRef } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './custom.css'; // Make sure this imports Tailwind CSS styles properly
import Popping from './Popping';
import axios from 'axios';

const locales = {
  'en-US': enUS,
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
      const response = await axios.get('http://localhost:5000/events');
      console.log('Fetched events:', response.data);

      const eventArray = Array.isArray(response.data) ? response.data : [];

      const formattedEvents = eventArray.map(event => ({
        ...event,
        start: new Date(event.start),
        end: new Date(event.end),
      }));

      setEvents(formattedEvents);
    } catch (error) {
      console.error('Error fetching events: ', error);
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
      calendarRef.current.scrollIntoView({ behavior: 'smooth' });
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
      <div className="">
        <h1 className="cursor-pointer text-2xl font-bold mb-4 ml-9" onClick={scrollToCalendar} style={{ color: '#52B14A' }}>
          Calendar
        </h1>
      </div>
      <div className="flex justify-center items-center rounded-2xl m-8 bg-blue-50 p-4" ref={calendarRef}>
        <Popping
          open={open}
          handleClose={closeEventClick}
          event={selectedEvent}
          fetchEvents={fetchEvents}
        />
        <div className="">
          <div className="bg-white shadow-lg rounded-lg p-9 border-3 border-blue-300">
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500, width: 1100, fontFamily: 'sans-serif', fontSize: '16px' }}
              onSelectEvent={openEventClick}
              views={['month', 'week', 'day', 'agenda']}
              components={{
                prev: PrevButton,
                next: NextButton,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCalendar;
