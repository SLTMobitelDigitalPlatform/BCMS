import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Employee from "./pages/Employees/Employee";
import Document from "./pages/documents/Document";
import Calendar from "./pages/calendar/Calendar";

import Meeting from "./pages/meetings/Meeting";
import Roles from "./pages/Roles_Responsibilities/Roles";
import UpdateEvent from "./pages/calendar/UpdateEvent";
import AddEvents from "./pages/calendar/AddEvents";
import 'bootstrap/dist/css/bootstrap.min.css';
import MyCalendar from "./pages/calendar/BigCalendar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="flex gap-x-10">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/document" element={<Document />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/big-calendar" element={<MyCalendar />} /> {/* Add the BigCalendar route */}
          <Route path="/meeting" element={<Meeting />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/event/:id/update" element={<UpdateEvent />} />
          <Route path="/add-event" element={<AddEvents />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
