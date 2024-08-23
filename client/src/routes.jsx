import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import Layout from "./pages/Layout";

import ProtectedRoute from "./auth/ProtectedRoute";
import AboutmeForm from "./components/AboutmeForm";
import AboutmeView from "./components/AboutmeView";
import Profile from "./components/Profile";
import AddEvents from "./pages/calendar/AddEvents";
import Calendar from "./pages/calendar/Calendar";
import UpdateEvent from "./pages/calendar/UpdateEvent";
import AdminHomePage from "./pages/Dashboards/AdminHomePage";
import CoordinatorHomePage from "./pages/Dashboards/CoordinatorHomePage";
import Dashboard from "./pages/Dashboards/Dashboard";
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
import FeedbackList from "./pages/Home/FeedbackList";
import Home from "./pages/Home/Home";
import RiskManagement from "./pages/Home/RiskManagement";
import Login from "./pages/Login/Login";
import SubscriptionForm from "./pages/Login/SubscriptionForm";
import SubscriptionPage from "./pages/Login/SubscriptionPage";
import CreateMeeting from "./pages/meetings/CreateMeeting";
import EditMeeting from "./pages/meetings/EditMeeting";
import Meeting from "./pages/meetings/Meeting";
import UpdateMeeting from "./pages/meetings/UpdateMeetings";
import ViewMeeting from "./pages/meetings/ViewMeeting";
import Otp from "./pages/Otp/Otp";
import CreateRoles from "./pages/Roles_Responsibilities/CreateRoles";
import EditRoles from "./pages/Roles_Responsibilities/EditRoles";
import Roles from "./pages/Roles_Responsibilities/Roles";
import CreateObjective from "./pages/documents/ContextOrganization/Objectives/CreateObjective";
import EditObjectives from "./pages/documents/ContextOrganization/Objectives/EditObjective";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/risk-management",
    element: <RiskManagement />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/about-us",
    element: <AboutUs />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/contact-us",
    element: <Contact />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/feedback",
    element: <Feedback />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/feedbacks",
    element: <FeedbackList />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/description/:id",
    element: <DescriptionPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/otp",
    element: <Otp />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/subscribe",
    element: <SubscriptionPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/subscribeForm",
    element: <SubscriptionForm />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element: <Layout />, // Wraps with Navbar, Sidebar
    errorElement: <ErrorPage />, // Error page for layout routes
    children: [
      { path: "profile", element: <Profile /> },
      { path: "dash", element: <Dashboard /> },
      { path: "/meeting", element: <Meeting /> },
      {
        path: "/admin",
        element: (
          <ProtectedRoute>
            <AdminHomePage />
          </ProtectedRoute>
        ),
      },
      //
      { path: "/meeting/viewMeetings/:id", element: <ViewMeeting /> },
    ],
  },
  {
    path: "/employeedash",
    element: <EmployeeHomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/secrecoordinator",
    element: <SecreCoordinatorHomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/coordinator",
    element: <CoordinatorHomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/team",
    element: <TeamHomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/employee",
    element: <Employee />,
    errorElement: <ErrorPage />,
  },

  {
    path: "/meeting/createMeeting",
    element: <CreateMeeting />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/meeting/updateMeetings/:id",
    element: <UpdateMeeting />,
    errorElement: <ErrorPage />,
  },
  // {
  //   path: "/meeting/viewMeetings/:id",
  //   element: <ViewMeeting />,
  //   errorElement: <ErrorPage />,
  // },
  {
    path: "/meeting/viewMeetings/:id/editmeeting",
    element: <EditMeeting />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/roles/createRoles",
    element: <CreateRoles />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/roles/editRoles",
    element: <EditRoles />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/roles",
    element: <Roles />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/AboutmeView/AboutmeForm",
    element: <AboutmeForm />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/AboutmeView",
    element: <AboutmeView />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/calendar",
    element: <Calendar />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/event/:id/update",
    element: <UpdateEvent />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/add-event",
    element: <AddEvents />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/riskAssesements",
    element: <RiskAssesement />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/createRisk",
    element: <CreateRiskAssesement />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/editRisk/:id",
    element: <EditRiskAssesement />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/versionControls",
    element: <VersionControls />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/createVersion",
    element: <CreateVersionControl />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/editVersion/:id",
    element: <EditVersionControl />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/editObjective/:id",
    element: <EditObjectives />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/objectives",
    element: <Objectives />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/createObjective",
    element: <CreateObjective />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/interfaces",
    element: <InterfacesDependencies />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/masterProcedures",
    element: <MasterProcedures />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/internalIssues",
    element: <InternalIssues />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/externalIssues",
    element: <ExternalIssues />,
    errorElement: <ErrorPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
