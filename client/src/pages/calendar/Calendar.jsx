import axios from "axios";
import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../Navbar";
import AddEvents from "./AddEvents";
import MyCalendar from "./BigCalendar";

export default function Calendar() {
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState(null);

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

    fetchUserDetails();
  }, []);

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
          {user &&
          (user.role === "superadmin" ||
            user.role === "secretariat coordinator" ||
            user.role === "coordinators") &&
          !showAddEvent ? (
            <button
              onClick={handleAddEventClick}
              className="absolute top-0 right-0 bg-gradient-to-r from-[#003E81] to-[#52B14A] text-white px-4 py-2 rounded mr-6"
            >
              Add Event
            </button>
          ) : (
            " "
          )}
          {showAddEvent && <AddEvents onAddEvent={handleAddEvent} />}
          {!showAddEvent && <MyCalendar events={events} />}
        </div>
      </div>
    </div>
  );
}
