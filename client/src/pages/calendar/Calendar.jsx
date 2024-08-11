import React, { useState } from "react";
import MyCalendar from "./BigCalendar";
import AddEvents from "./AddEvents";
import Sidebar from "../../components/Sidebar";
import Navbar from "../Navbar";

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
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <div className="flex gap-x-4">
        <Sidebar />
        <div className="relative min-h-screen mr-6 ml-10">
          {!showAddEvent && (
            <button
              onClick={handleAddEventClick}
              className="absolute top-0 right-0 bg-gradient-to-r from-[#003E81] to-[#52B14A] text-white px-4 py-2 rounded mr-6"
            >
              Add Event
            </button>
          )}
          {showAddEvent && <AddEvents onAddEvent={handleAddEvent} />}
          {!showAddEvent && <MyCalendar events={events} />}
        </div>
      </div>
    </div>
  );
}
