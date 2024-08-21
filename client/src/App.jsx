import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AboutmeForm from "./components/AboutmeForm";
import AboutmeView from "./components/AboutmeView";
import AddEvents from "./pages/calendar/AddEvents";
import Calendar from "./pages/calendar/Calendar";
import UpdateEvent from "./pages/calendar/UpdateEvent";
import AdminHomePage from "./pages/Dashboards/AdminHomePage";
import CoordinatorHomePage from "./pages/Dashboards/CoordinatorHomePage";
import EmployeeHomePage from "./pages/Dashboards/EmployeeHomePage";
import SecreCoordinatorHomePage from "./pages/Dashboards/SecreCoordinatorHomePage";
import TeamHomePage from "./pages/Dashboards/TeamHomePage";
import InterfacesDependencies from "./pages/documents/ContextOrganization/InterfacesDependencies/InterfacesDependencies";
import ExternalIssues from "./pages/documents/ContextOrganization/IssueRegister/ExternalIssues";
import InternalIssues from "./pages/documents/ContextOrganization/IssueRegister/InternalIssues";
import MasterProcedures from "./pages/documents/ContextOrganization/MasterProcedures/MasterProcedures";
import Objectives from "./pages/documents/ContextOrganization/Objectives/Objectives";
import CreateVersionControl from "./pages/documents/ContextOrganization/VersionControl/CreateVersionControl";
import EditVersionControl from "./pages/documents/ContextOrganization/VersionControl/EditVersionControl";
import VersionControls from "./pages/documents/ContextOrganization/VersionControl/VersionControls";
import CreateRiskAssesement from "./pages/documents/RiskAssesement/CreateRiskAssesement";
import EditRiskAssesement from "./pages/documents/RiskAssesement/EditRiskAssesement";
import RiskAssesement from "./pages/documents/RiskAssesement/RiskAssesement";
import Employee from "./pages/Employees/Employee";
import AboutUs from "./pages/Home/AboutUs";
import Contact from "./pages/Home/Contact";
import DescriptionPage from "./pages/Home/description";
import Feedback from "./pages/Home/Feedback";
import Home from "./pages/Home/Home";
// import EditPage from "./pages/Home/HomeEdit";
import RiskManagement from "./pages/Home/RiskManagement";
import Login from "./pages/Login/Login";
import SubscriptionForm from "./pages/Login/SubscriptionForm";
import SubscriptionPage from "./pages/Login/SubscriptionPage";
import CreateMeeting from "./pages/meetings/CreateMeeting";
import EditMeeting from "./pages/meetings/EditMeeting";
import Meeting from "./pages/meetings/Meeting";
import UpdateMeetings from "./pages/meetings/UpdateMeetings";
import ViewMeeting from "./pages/meetings/ViewMeeting";
import Otp from "./pages/Otp/Otp";
import CreateRoles from "./pages/Roles_Responsibilities/CreateRoles";
import EditRoles from "./pages/Roles_Responsibilities/EditRoles";
import Roles from "./pages/Roles_Responsibilities/Roles";
import FeedbackList from "./pages/Home/FeedbackList";
import SubscriptionForm1 from "./pages/Login/SubscriptionForm1";
import ProtectedRoute from "./auth/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Home & Customer Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/risk-management" element={<RiskManagement />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/feedbacks" element={<FeedbackList />} />

        {/* <Route path="/edit" element={<EditPage />} /> */}
        <Route path="/description/:id" element={<DescriptionPage />} />

        {/* Login */}
        <Route path="/login" element={<Login />} />
        <Route path="/otp" element={<Otp />} />

        {/* Subscribe */}
        <Route path="/subscribe" element={<SubscriptionPage />} />
        <Route path="/subscribeForm" element={<SubscriptionForm />} />
        <Route path="/subscribeForm1" element={<SubscriptionForm1 />} />

        {/* Dashboards */}
        <Route path="/employeedash" element={<EmployeeHomePage />} />
        <Route
          path="/secrecoordinator"
          element={<SecreCoordinatorHomePage />}
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminHomePage />
            </ProtectedRoute>
          }
        />
        <Route path="/coordinator" element={<CoordinatorHomePage />} />
        <Route path="/team" element={<TeamHomePage />} />

        {/* Employee Table */}
        <Route path="/employee" element={<Employee />} />

        {/* Meeting */}
        <Route path="/meeting" element={<Meeting />} />
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

        {/* Roles */}
        <Route path="/roles/createRoles" element={<CreateRoles />} />
        <Route path="/roles/editRoles" element={<EditRoles />} />
        <Route path="/roles" element={<Roles />} />

        {/* About */}
        <Route path="/AboutmeView/AboutmeForm" element={<AboutmeForm />} />
        <Route path="/AboutmeView" element={<AboutmeView />} />

        {/* Calendar */}
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
