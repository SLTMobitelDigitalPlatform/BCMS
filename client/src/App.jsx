// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EmployeeHomePage from "./pages/Dashboards/EmployeeHomePage";
import SecreCoordinatorHomePage from "./pages/Dashboards/SecreCoordinatorHomePage";
import "./index.css";
import CoordinatorHomePage from "./pages/Dashboards/CoordinatorHomePage";
import AdminHomePage from "./pages/Dashboards/AdminHomePage";
import TeamHomePage from "./pages/Dashboards/TeamHomePage";
import Login from "./pages/Login/Login";
import Employee from "./pages/Employees/Employee";

import Calendar from "./pages/calendar/Calendar";
import Meeting from "./pages/meetings/Meeting";
import Roles from "./pages/Roles_Responsibilities/Roles";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home/Home";
import Otp from "./pages/Otp/Otp";
import SubscriptionPage from "./pages/Login/SubscriptionPage";
import CreateRoles from "./pages/Roles_Responsibilities/CreateRoles";
import EditRoles from "./pages/Roles_Responsibilities/EditRoles";
import AboutmeForm from "./components/AboutmeForm";
import AboutmeView from "./components/AboutmeView";
import CreateMeeting from "./pages/meetings/CreateMeeting";
import UpdateMeetings from "./pages/meetings/UpdateMeetings";
import ViewMeeting from "./pages/meetings/ViewMeeting";
import EditMeeting from "./pages/meetings/EditMeeting";
import EditPage from "./pages/Home/HomeEdit";
import DescriptionPage from "./pages/Home/description";
import SubscriptionForm from "./pages/Login/SubscriptionForm";
import UpdateEvent from "./pages/calendar/UpdateEvent";
import AddEvents from "./pages/calendar/AddEvents";

import RiskAssesement from "./pages/documents/RiskAssesement/RiskAssesement";
import CreateRiskAssesement from "./pages/documents/RiskAssesement/CreateRiskAssesement";
import EditRiskAssesement from "./pages/documents/RiskAssesement/EditRiskAssesement";

import VersionControls from "./pages/documents/ContextOrganization/VersionControl/VersionControls";
import CreateVersionControl from "./pages/documents/ContextOrganization/VersionControl/CreateVersionControl";
import EditVersionControl from "./pages/documents/ContextOrganization/VersionControl/EditVersionControl";

import Objectives from "./pages/documents/ContextOrganization/Objectives/Objectives";
import InterfacesDependencies from "./pages/documents/ContextOrganization/InterfacesDependencies/InterfacesDependencies";
import MasterProcedures from "./pages/documents/ContextOrganization/MasterProcedures/MasterProcedures";
import InternalIssues from "./pages/documents/ContextOrganization/IssueRegister/InternalIssues";
import ExternalIssues from "./pages/documents/ContextOrganization/IssueRegister/ExternalIssues";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/employeedash" element={<EmployeeHomePage />} />
        <Route
          path="/secrecoordinator"
          element={<SecreCoordinatorHomePage />}
        />
        <Route path="/admin" element={<AdminHomePage />} />
        <Route path="/coordinator" element={<CoordinatorHomePage />} />
        <Route path="/team" element={<TeamHomePage />} />

        <Route path="/home" element={<Home />} />
        <Route path="/edit" element={<EditPage />} />
        <Route path="/description/:id" element={<DescriptionPage />} />

        <Route path="/employee" element={<Employee />} />

        <Route path="/meeting" element={<Meeting />} />

        <Route path="/roles/createRoles" element={<CreateRoles />} />
        <Route path="/roles/editRoles" element={<EditRoles />} />
        <Route path="/roles" element={<Roles />} />

        <Route path="/AboutmeView/AboutmeForm" element={<AboutmeForm />} />
        <Route path="/AboutmeView" element={<AboutmeView />} />

        <Route path="/meeting/createMeeting" element={<CreateMeeting />} />
        <Route
          path="/meeting/updateMeetings/:id"
          element={<UpdateMeetings />}
        />
        <Route path="/meeting/viewMeetings/:id" element={<ViewMeeting />} />
        <Route
          path="/meeting/viewMeetings/:id/editmeeting"
          element={<EditMeeting />}
        />

        <Route path="/subscribe" element={<SubscriptionPage />} />
        <Route path="/subscribeForm" element={<SubscriptionForm />} />

        <Route path="/calendar" element={<Calendar />} />
        <Route path="/event/:id/update" element={<UpdateEvent />} />
        <Route path="/add-event" element={<AddEvents />} />

        <Route path="/riskAssesements" element={<RiskAssesement />} />
        <Route path="/createRisk" element={<CreateRiskAssesement />} />
        <Route path="/editRisk/:id" element={<EditRiskAssesement />} />

        <Route path="/versionControls" element={<VersionControls />} />
        <Route path="/createVersion" element={<CreateVersionControl />} />
        <Route path="/editVersion/:id" element={<EditVersionControl />} />

        <Route path="/objectives" element={<Objectives />} />
        <Route path="/interfaces" element={<InterfacesDependencies />} />
        <Route path="/masterProcedures" element={<MasterProcedures />} />
        <Route path="/internalIssues" element={<InternalIssues />} />
        <Route path="/externalIssues" element={<ExternalIssues />} />
      </Routes>
    </Router>
  );
}

export default App;
