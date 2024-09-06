import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./auth/ProtectedRoute";
import Profile from "./components/Profile";
import Calendar from "./pages/calendar/Calendar";
import UpdateEvent from "./pages/calendar/UpdateEvent";
import Customer from "./pages/Customers/Customer";
import BIA from "./pages/documents/BIA/BIA";
import ContextOfTheOrganizationLayout from "./pages/documents/ContextOrganization/ContextOfTheOrganizationLayout";
import CreateInterfaceDependancy from "./pages/documents/ContextOrganization/InterfacesDependencies/createInterfaceDependancy";
import EditInterfacesAndDependancies from "./pages/documents/ContextOrganization/InterfacesDependencies/EditInterfacesAndDependancies";
import InterfacesDependencies from "./pages/documents/ContextOrganization/InterfacesDependencies/InterfacesDependencies";
import CreateExternalIssue from "./pages/documents/ContextOrganization/IssueRegister/CreateExternalIssue";
import CreateInternalIssue from "./pages/documents/ContextOrganization/IssueRegister/CreateInternalIssue";
import EditExternal from "./pages/documents/ContextOrganization/IssueRegister/EditExternal";
import EditInternal from "./pages/documents/ContextOrganization/IssueRegister/EditInternal";
import ExternalIssues from "./pages/documents/ContextOrganization/IssueRegister/ExternalIssues";
import InternalIssues from "./pages/documents/ContextOrganization/IssueRegister/InternalIssues";
import CreateMasterProducers from "./pages/documents/ContextOrganization/MasterProcedures/CreateMasterProducers";
import EditMasterProducers from "./pages/documents/ContextOrganization/MasterProcedures/EditMasterProducers";
import MasterProcedures from "./pages/documents/ContextOrganization/MasterProcedures/MasterProcedures";
import CreateObjective from "./pages/documents/ContextOrganization/Objectives/CreateObjective";
import EditObjectives from "./pages/documents/ContextOrganization/Objectives/EditObjective";
import Objectives from "./pages/documents/ContextOrganization/Objectives/Objectives";
import CreateVersionControl from "./pages/documents/ContextOrganization/VersionControl/CreateVersionControl";
import EditVersionControl from "./pages/documents/ContextOrganization/VersionControl/EditVersionControl";
import VersionControls from "./pages/documents/ContextOrganization/VersionControl/VersionControls";
import BCPRiskAssesement from "./pages/documents/RiskAssesement/bcp/BCPRiskAssesement";
import CreateBCPRiskAssesement from "./pages/documents/RiskAssesement/bcp/CreateBCPRiskAssesement";
import EditBCPRiskAssesement from "./pages/documents/RiskAssesement/bcp/EditBCPRiskAssesement";
import CreateISRiskAssesement from "./pages/documents/RiskAssesement/informationSecurity/CreateISRiskAssesement";
import EditISRiskAssesement from "./pages/documents/RiskAssesement/informationSecurity/EditISRiskAssesement";
import ISRiskAssesement from "./pages/documents/RiskAssesement/informationSecurity/ISRiskAssesement";
import CreateQualityManagement from "./pages/documents/RiskAssesement/qualityManagement/CreateQualityManagement";
import EditQualityManagement from "./pages/documents/RiskAssesement/qualityManagement/EditQualityManagement";
import QualityManagement from "./pages/documents/RiskAssesement/qualityManagement/QualityManagement";
import CreateIResidualRiskAssesement from "./pages/documents/RiskAssesement/residualRiskAssesment/CreateIResidualRiskAssesement";
import EditResidualRiskAssesement from "./pages/documents/RiskAssesement/residualRiskAssesment/EditResidualRiskAssesement";
import ResidualRiskAssesement from "./pages/documents/RiskAssesement/residualRiskAssesment/ResidualRiskAssesement";
import CreateRiskVersionControl from "./pages/documents/RiskAssesement/riskVersionControl/CreateVersionControl";
import EditRiskVersionControl from "./pages/documents/RiskAssesement/riskVersionControl/EditVersionControl";
import RiskVersionControls from "./pages/documents/RiskAssesement/riskVersionControl/RiskVersionControl";
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
import { Section } from "./pages/sections/Section";
import RiskElements from "./pages/documents/RiskAssesement/riskElements/RiskElements";
import CallTree from "./pages/Call Tree/CallTree";

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
      {
        path: "/sections",
        element: <Section />,
      },

      // Customer Table
      { path: "customers", element: <Customer /> },

      // Sections
      { path: "sections", element: <Section /> },

      // Call Tree
      { path: "callTree", element: <CallTree /> },

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
      //?--------------------------  Risk Assessment  ----------------------------------------------
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
      {
        path: "editResidualRisk/:id/:source",
        element: <EditResidualRiskAssesement />,
      },
      {
        path: "riskElements",
        element: <RiskElements />,
      },

      //? ------------------------ Context of the Organization -----------------------------
      // * Layout
      {
        path: "Context-of-the-Organization",
        element: <ContextOfTheOrganizationLayout />,
        children: [
          { path: "versionControls", element: <VersionControls /> },
          { path: "externalIssues", element: <ExternalIssues /> },
          { path: "internalIssues", element: <InternalIssues /> },
          { path: "interfaces", element: <InterfacesDependencies /> },
          { path: "objectives", element: <Objectives /> },
          { path: "masterProcedures", element: <MasterProcedures /> },
        ],
      },

      // * Version Controls
      { path: "versionControls", element: <VersionControls /> },
      { path: "createVersion", element: <CreateVersionControl /> },

      // * Intersested Parties

      // * Issue Register
      // ** External Issues
      { path: "createExternalIssue", element: <CreateExternalIssue /> },
      {
        path: "editExternalIssues/:id",
        element: <EditExternal />,
      },

      // ** Internal Issues

      { path: "createInternalIssue", element: <CreateInternalIssue /> },
      {
        path: "editInternalIssues/:id",
        element: <EditInternal />,
      },

      // * Interfaces and Dependencies
      {
        path: "createInterfaceDependancy",
        element: <CreateInterfaceDependancy />,
      },
      {
        path: "editInterfaceDependancy/:id",
        element: <EditInterfacesAndDependancies />,
      },

      // * Objectives
      { path: "createObjective", element: <CreateObjective /> },
      { path: "editObjective/:id", element: <EditObjectives /> },

      // * Master of Procedures and Process
      { path: "createMasterProducers", element: <CreateMasterProducers /> },
      { path: "editMasterProcedures/:id", element: <EditMasterProducers /> },

      //? --------------------------------- BIA -------------------------------------
      { path: "bia", element: <BIA /> },

      //? -------------------------------- BCP --------------------------------------

      // Roles
      { path: "roles", element: <Roles /> },
      { path: "roles/createRoles", element: <CreateRoles /> },
      { path: "roles/editRoles", element: <EditRoles /> },
    ],
  },

  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
