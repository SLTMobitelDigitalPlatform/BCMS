import React, { useState } from 'react';
import MyCalendar from './BigCalendar';
import AddEvents from './AddEvents';

export default function Calendar() {
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [events, setEvents] = useState([]);

  const handleAddEventClick = () => {
    setShowAddEvent(true);
  };

  const handleAddEvent = (newEvent) => {
    setEvents((prevEvents) => [...prevEvents, newEvent]);
    setShowAddEvent(false);
  };

  return (
    <div className="relative min-h-screen">
      {!showAddEvent && (
        <button
          onClick={handleAddEventClick}
          className="absolute top-0 right-0 bg-gradient-to-r from-[#003E81] to-[#52B14A] text-white px-4 py-2 rounded shadow-lg hover:from-[#002b59] hover:to-[#3a8c3c] mr-8"
        >
          Add Event
        </button>
      )}
      {showAddEvent && <AddEvents onAddEvent={handleAddEvent} />}
      {!showAddEvent && <MyCalendar events={events} />}
    </div>
  );
}
