// App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Employee from "./pages/Employees/Employee";
import Document from "./pages/documents/Document";
import Calendar from "./pages/calendar/Calendar";
import Meeting from "./pages/meetings/Meeting";
import Roles from "./pages/Roles_Responsibilities/Roles";
import CreateMeeting from "./pages/meetings/CreateMeeting";
import UpdateMeetings from "./pages/meetings/UpdateMeetings";
import ViewMeeting from "./pages/meetings/ViewMeeting";
import AboutmeForm from "./components/AboutmeForm";
import EditMeeting from "./pages/meetings/EditMeeting";
import AboutmeView from "./components/AboutmeView";
import CreateRoles from "./pages/Roles_Responsibilities/CreateRoles";
import EditRoles from "./pages/Roles_Responsibilities/EditRoles";

function App() {
  return (
    <BrowserRouter>
    <Navbar />

      
      <div className="flex gap-x-10">
        <div className="fixed z-10 top-20">
        <Sidebar />
        </div>       
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/document" element={<Document />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/meeting" element={<Meeting />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/roles/createRoles" element={<CreateRoles />} />
          <Route path="/roles/editRoles" element={<EditRoles />} />
          <Route path="/AboutmeView/AboutmeForm" element={<AboutmeForm />} />
          <Route path="/AboutmeView" element={<AboutmeView />} />
          <Route path="/meeting/createMeeting" element={<CreateMeeting />} />
          <Route path="/meeting/updateMeetings/:id" element={<UpdateMeetings />} />
          <Route path="/meeting/viewMeetings/:id" element={<ViewMeeting />} />
          <Route path="/meeting/viewMeetings/:id/editmeeting" element={<EditMeeting />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
