import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./auth/ProtectedRoute";
import Profile from "./components/Profile";
import Calendar from "./pages/calendar/Calendar";
import UpdateEvent from "./pages/calendar/UpdateEvent";
import CreateInterfaceDependancy from "./pages/documents/ContextOrganization/InterfacesDependencies/createInterfaceDependancy";
import InterfacesDependencies from "./pages/documents/ContextOrganization/InterfacesDependencies/InterfacesDependencies";
import CreateExternalIssue from "./pages/documents/ContextOrganization/IssueRegister/CreateExternalIssue";
import CreateInternalIssue from "./pages/documents/ContextOrganization/IssueRegister/CreateInternalIssue";
import ExternalIssues from "./pages/documents/ContextOrganization/IssueRegister/ExternalIssues";
import InternalIssues from "./pages/documents/ContextOrganization/IssueRegister/InternalIssues";
import CreateMasterProducers from "./pages/documents/ContextOrganization/MasterProcedures/CreateMasterProducers";
import MasterProcedures from "./pages/documents/ContextOrganization/MasterProcedures/MasterProcedures";
import CreateObjective from "./pages/documents/ContextOrganization/Objectives/CreateObjective";
import EditObjectives from "./pages/documents/ContextOrganization/Objectives/EditObjective";
import Objectives from "./pages/documents/ContextOrganization/Objectives/Objectives";
import CreateVersionControl from "./pages/documents/ContextOrganization/VersionControl/CreateVersionControl";
import EditVersionControl from "./pages/documents/ContextOrganization/VersionControl/EditVersionControl";
import VersionControls from "./pages/documents/ContextOrganization/VersionControl/VersionControls";
import CreateRiskAssesement from "./pages/documents/RiskAssesement/CreateRiskAssesement";
import EditRiskAssesement from "./pages/documents/RiskAssesement/EditRiskAssesement";
import RiskAssesement from "./pages/documents/RiskAssesement/RiskAssesement";
import Employee from "./pages/Employees/Employee";
import ErrorPage from "./pages/ErrorPage";
import AboutUs from "./pages/Home/AboutUs";
import Contact from "./pages/Home/Contact";
import DescriptionPage from "./pages/Home/description";
import Feedback from "./pages/Home/Feedback";
import FeedbackList from "./pages/Home/FeedbackList";
import Home from "./pages/Home/Home";
import RiskManagement from "./pages/Home/RiskManagement";
import Layout from "./pages/Layout";
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
import EditBCPRiskAssesement from "./pages/documents/RiskAssesement/bcp/EditBCPRiskAssesement";
import BCPRiskAssesement from "./pages/documents/RiskAssesement/bcp/BCPRiskAssesement";
import CreateBCPRiskAssesement from "./pages/documents/RiskAssesement/bcp/CreateBCPRiskAssesement";
import CreateISRiskAssesement from "./pages/documents/RiskAssesement/informationSecurity/CreateISRiskAssesement";
import RiskVersionControls from "./pages/documents/RiskAssesement/riskVersionControl/RiskVersionControl";
import EditISRiskAssesement from "./pages/documents/RiskAssesement/informationSecurity/EditISRiskAssesement";

import ISRiskAssesement from "./pages/documents/RiskAssesement/informationSecurity/ISRiskAssesement";
import CreateRiskVersionControl from "./pages/documents/RiskAssesement/riskVersionControl/CreateVersionControl";
import EditRiskVersionControl from "./pages/documents/RiskAssesement/riskVersionControl/EditVersionControl";
import QualityManagement from "./pages/documents/RiskAssesement/qualityManagement/QualityManagement";
import CreateQualityManagement from "./pages/documents/RiskAssesement/qualityManagement/CreateQualityManagement";
import EditQualityManagement from "./pages/documents/RiskAssesement/qualityManagement/EditQualityManagement";
import ResidualRiskAssesement from "./pages/documents/RiskAssesement/residualRiskAssesment/ResidualRiskAssesement";
import CreateIResidualRiskAssesement from "./pages/documents/RiskAssesement/residualRiskAssesment/CreateIResidualRiskAssesement";
import EditResidualRiskAssesement from "./pages/documents/RiskAssesement/residualRiskAssesment/EditResidualRiskAssesement";


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
  // Dashboard
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      // Employee Table
      { path: "employee", element: <Employee /> },

      // Customer Table

      // Meetings
      { path: "meeting", element: <Meeting /> },
      { path: "meeting/createMeeting", element: <CreateMeeting /> },

      { path: "meeting/viewMeetings/:id", element: <ViewMeeting /> },
      { path: "meeting/updateMeetings/:id", element: <UpdateMeeting /> },
      {
        path: "meeting/viewMeetings/:id/editmeeting",
        element: <EditMeeting />,
      },

      // Calendar
      { path: "calendar", element: <Calendar /> },
      { path: "event/:id/update", element: <UpdateEvent /> },

      //!  { path: "add-event", element: <AddEvents /> },

      // Documents
      //?  Risk Assessment
      //! { path: "riskAssesements", element: <RiskAssesement /> },
      //! { path: "createRisk", element: <CreateRiskAssesement /> },
      //!{ path: "editRisk/:id", element: <EditRiskAssesement /> },

      // * Version Controls
      { path: "riskVersionControl", element: <RiskVersionControls /> },
      { path: "editVersion/:id", element: <EditVersionControl /> },
      { path: "createRiskVersion", element: <CreateRiskVersionControl /> },
      { path: "editISRiskVersion/:id", element: <EditRiskVersionControl /> },

      // * Information Security
      { path: "informationSecurity", element: <ISRiskAssesement /> },
      { path: "createRiskIS", element: <CreateISRiskAssesement /> },
      { path: "editISRisk/:id", element: <EditISRiskAssesement /> },

      //  * BCP Risk Assesment
      { path: "bcpRisk", element: <BCPRiskAssesement /> },
      { path: "createBCPRisk", element: <CreateBCPRiskAssesement /> },
      { path: "editBCPRisk/:id", element: <EditBCPRiskAssesement /> },

      //  * Quality Management Risk Assesment
      { path: "qualityManagement", element: <QualityManagement /> },
      { path: "createQualityManagement", element: <CreateQualityManagement /> },
      { path: "editQualityManagement/:id", element: <EditQualityManagement /> },

      //  * Residual Risk Assesment
      { path: "residualRisk", element: <ResidualRiskAssesement /> },
      {
        path: "createResidualRisk",
        element: <CreateIResidualRiskAssesement />,
      },
      { path: "editResidualRisk/:id", element: <EditResidualRiskAssesement /> },

      //? Context of the Organization
      // * Version Controls
      { path: "versionControls", element: <VersionControls /> },
      { path: "createVersion", element: <CreateVersionControl /> },

      // * Intersested Parties

      // * Issue Register
      // ** External Issues
      { path: "externalIssues", element: <ExternalIssues /> },
      { path: "createExternalIssue", element: <CreateExternalIssue /> },

      // ** Internal Issues
      { path: "internalIssues", element: <InternalIssues /> },
      { path: "createInternalIssue", element: <CreateInternalIssue /> },

      // * Interfaces and Dependencies
      { path: "interfaces", element: <InterfacesDependencies /> },
      {
        path: "createInterfaceDependancy",
        element: <CreateInterfaceDependancy />,
      },

      // * Objectives
      { path: "objectives", element: <Objectives /> },
      { path: "createObjective", element: <CreateObjective /> },
      { path: "editObjective/:id", element: <EditObjectives /> },

      // * Master of Procedures and Process
      { path: "masterProcedures", element: <MasterProcedures /> },
      { path: "createMasterProducers", element: <CreateMasterProducers /> },

      //? BIA

      //? BCP

      // Roles
      { path: "roles", element: <Roles /> },
      { path: "roles/createRoles", element: <CreateRoles /> },
      { path: "roles/editRoles", element: <EditRoles /> },
    ],
  },
  {
    path: "/customers",
    element: <Customer />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
