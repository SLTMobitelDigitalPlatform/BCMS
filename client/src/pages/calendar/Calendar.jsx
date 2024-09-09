import axios from "axios";
import { useEffect, useState } from "react";
import AddEvents from "./AddEvents";
import MyCalendar from "./BigCalendar";
import Modal from "react-modal";

Modal.setAppElement("#root");

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
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center">
        <h1 className="topic">Calendar</h1>
        {user &&
        (user.role === "Super Admin" ||
          user.role === "Secretariat Coordinator" ||
          user.role === "BCM Coordinator") &&
        !showAddEvent ? (
          <button
            onClick={handleAddEventClick}
            className="btn-primary px-6 py-2 rounded-xl text-white font-medium"
          >
            Add Event
          </button>
        ) : (
          " "
        )}
      </div>
      <div className="relative h-full overflow-y-auto">
        {/* {showAddEvent && <AddEvents onAddEvent={handleAddEvent} />} */}
        {!showAddEvent && <MyCalendar events={events} />}
      </div>

      {/* React Modal for AddEvents */}
      <Modal
        isOpen={showAddEvent}
        onRequestClose={() => setShowAddEvent(false)}
        className="bg-white max-w-7xl w-full mx-auto px-8 py-1 border border-gray-300 rounded-lg shadow-lg"
        overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center"
      >
        <AddEvents onAddEvent={handleAddEvent} />
      </Modal>
      {/* <button
        onClick={() => setShowAddEvent(false)}
        className="text-gray-500 hover:text-gray-700"
      >
        &times;
      </button> */}
    </div>
  );
}
