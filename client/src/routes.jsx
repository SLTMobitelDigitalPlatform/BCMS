import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./auth/ProtectedRoute";
import Profile from "./components/Profile";
import Calendar from "./pages/calendar/Calendar";
import UpdateEvent from "./pages/calendar/UpdateEvent";
import CallTree from "./pages/Call Tree/CallTree";
import CallTreeTable from "./pages/Call Tree/CallTreeTable";
import TestCallTree from "./pages/Call Tree/TestCallTree";
import Customer from "./pages/Customers/Customer";
import BCPForm from "./pages/documents/BCP/BCPForm/BCPForm";
import BusinessContinuityPlanLayout from "./pages/documents/BCP/BusinessContinuityPlanLayout";
import CriticalBusinessFunction from "./pages/documents/BCP/Critical Business Function/CriticalBusinessFunction";
import Dependencies from "./pages/documents/BCP/Dependencies/Dependencies";
import DocumentControl from "./pages/documents/BCP/Document Control/DocumentControl";
import EmbeddedDocuments from "./pages/documents/BCP/Embedded Documents/EmbeddedDocuments";
import LegalRequirements from "./pages/documents/BCP/Legal Requirements/LegalRequirements";
import Manpower from "./pages/documents/BCP/Manpower/Manpower";
import PreIncidentPreparation from "./pages/documents/BCP/Pre-Incident Preparation/PreIncidentPreparation";
import RecoveryAndResumption from "./pages/documents/BCP/Recovery and Resumption/RecoveryAndResumption";
import RecoveryStrategy from "./pages/documents/BCP/Recovery Strategy/RecoveryStrategy";
import ResourcesRequired from "./pages/documents/BCP/Resources Required/ResourcesRequired";
import VitalRecords from "./pages/documents/BCP/Vital Records/VitalRecords";
import WorkAreaRecovery from "./pages/documents/BCP/Work Area Recovery/WorkAreaRecovery";
import ContextOfTheOrganizationLayout from "./pages/documents/ContextOrganization/ContextOfTheOrganizationLayout";
import CreateExternalParty from "./pages/documents/ContextOrganization/interestedParties/CreateExternalParty";
import CreateInternalParty from "./pages/documents/ContextOrganization/interestedParties/CreateInternalParty";
import EditExternalParty from "./pages/documents/ContextOrganization/interestedParties/EditExternalParty";
import EditInternalParty from "./pages/documents/ContextOrganization/interestedParties/EditInternalParty";
import InterestedParties from "./pages/documents/ContextOrganization/interestedParties/InterestedParties";
import CreateInterfaceDependancy from "./pages/documents/ContextOrganization/InterfacesDependencies/createInterfaceDependancy";
import EditInterfacesAndDependancies from "./pages/documents/ContextOrganization/InterfacesDependencies/EditInterfacesAndDependancies";
import InterfacesDependencies from "./pages/documents/ContextOrganization/InterfacesDependencies/InterfacesDependencies";
import CreateExternalIssue from "./pages/documents/ContextOrganization/IssueRegister/CreateExternalIssue";
import CreateInternalIssue from "./pages/documents/ContextOrganization/IssueRegister/CreateInternalIssue";
import EditExternal from "./pages/documents/ContextOrganization/IssueRegister/EditExternal";
import EditInternal from "./pages/documents/ContextOrganization/IssueRegister/EditInternal";
import IssueRegister from "./pages/documents/ContextOrganization/IssueRegister/IssueRegister";
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
import RiskAssessmentLayout from "./pages/documents/RiskAssesement/RiskAssessmentLayout";
import RiskElements from "./pages/documents/RiskAssesement/riskElements/RiskElements";
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
import Section from "./pages/sections/Section";

// BIA
import BiaDocumentControl from "./pages/documents/BIA/BiaDocumentControl";
import BiaForm from "./pages/documents/BIA/BiaForm";
import BiaLayout from "./pages/documents/BIA/BiaLayout";
//import BiaOperatingSites from "./pages/documents/BIA/*";
//import BiaCriticalBusinessFunction from "./pages/documents/BIA/*";
import BiaPeaksAndDeadlines from "./pages/documents/BIA/Peak&Deadlines/Peaks&Deadlines";
//import BiaResources from "./pages/documents/BIA/*";
import BiaImpactAnalysis from "./pages/documents/BIA/ImpactAnalysis";
import BiaResourcesRequired from "./pages/documents/BIA/ResourcesRequired";

import CreateBCP from "./pages/documents/BCP/BCPForm/CreateBCP";
import CreateEmbeddedDocuments from "./pages/documents/BCP/Embedded Documents/CreateEmbeddedDocuments";
import CreateResourcesRequired from "./pages/documents/BCP/Resources Required/CreateResourcesRequired";
import CreateVitalRecords from "./pages/documents/BCP/Vital Records/CreateVitalRecords";
import CreateWorkAreaRecovery from "./pages/documents/BCP/Work Area Recovery/CreateWorkAreaRecovery";
import AddEditTeams from "./pages/teams/AddEditTeams";
import TeamList from "./pages/teams/TeamList";
import CreateCriticalBusinessFunction from "./pages/documents/BCP/Critical Business Function/CreateCriticalBusinessFunction";
import CreateRecoveryStrategy from "./pages/documents/BCP/Recovery Strategy/CreateRecoveryStrategy";
import CreateLegalRequirements from "./pages/documents/BCP/Legal Requirements/CreateLegalRequirements";
import CreatePreIncidentPreparation from "./pages/documents/BCP/Pre-Incident Preparation/CreatePreIncidentPreparation";
import EditEmbeddedDocuments from "./pages/documents/BCP/Embedded Documents/EditEmbeddedDocuments";
//import BiaDependencies from "./pages/documents/BIA/*";
//import BiaWorkAreaRecovery from "./pages/documents/BIA/*";
//import BiaManpower from "./pages/documents/BIA/*";

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

      //Teams
      { path: "teams", element: <AddEditTeams /> },
      { path: "teams/teamList", element: <TeamList /> },
      { path: "teams/:teamId", element: <AddEditTeams /> },

      // Customer Table
      { path: "customers", element: <Customer /> },

      // Sections
      { path: "sections", element: <Section /> },

      // Call Tree
      { path: "callTree", element: <CallTree /> },
      { path: "testCallTree", element: <TestCallTree /> },
      { path: "callTreeTable", element: <CallTreeTable /> },

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
      // * Risk Assessment Layout
      {
        path: "Risk-Assessment",
        element: <RiskAssessmentLayout />,
        children: [
          { path: "versionControl", element: <RiskVersionControls /> },
          { path: "informationSecurity", element: <ISRiskAssesement /> },
          { path: "bcpRisk", element: <BCPRiskAssesement /> },
          { path: "qualityManagement", element: <QualityManagement /> },
          { path: "residualRisk", element: <ResidualRiskAssesement /> },
          { path: "riskElements", element: <RiskElements /> },
        ],
      },

      // * Version Controls
      { path: "createRiskVersion", element: <CreateRiskVersionControl /> },
      { path: "editISRiskVersion/:id", element: <EditRiskVersionControl /> },

      // * Information Security
      { path: "createRiskIS", element: <CreateISRiskAssesement /> },
      { path: "editISRisk/:id", element: <EditISRiskAssesement /> },

      //  * BCP Risk Assesment
      { path: "createBCPRisk", element: <CreateBCPRiskAssesement /> },
      { path: "editBCPRisk/:id", element: <EditBCPRiskAssesement /> },

      //  * Quality Management Risk Assesment
      { path: "createQualityManagement", element: <CreateQualityManagement /> },
      { path: "editQualityManagement/:id", element: <EditQualityManagement /> },

      //  * Residual Risk Assesment
      {
        path: "createResidualRisk",
        element: <CreateIResidualRiskAssesement />,
      },
      {
        path: "editResidualRisk/:id/:source",
        element: <EditResidualRiskAssesement />,
      },

      //? ------------------------ Context of the Organization -----------------------------
      // * Context of the Organization Layout
      {
        path: "Context-of-the-Organization",
        element: <ContextOfTheOrganizationLayout />,
        children: [
          { path: "version-control", element: <VersionControls /> },
          { path: "interested-parties", element: <InterestedParties /> },
          { path: "issue-register", element: <IssueRegister /> },
          {
            path: "interfaces-and-dependencies",
            element: <InterfacesDependencies />,
          },
          { path: "objectives", element: <Objectives /> },
          {
            path: "master-list-of-procedures/process",
            element: <MasterProcedures />,
          },
        ],
      },

      // * Version Controls
      { path: "createVersion", element: <CreateVersionControl /> },
      { path: "editVersion/:id", element: <EditVersionControl /> },

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
      //
      { path: "createInternalParty", element: <CreateInternalParty /> },
      {
        path: "editInternalParty/:id",
        element: <EditInternalParty />,
      },
      //
      { path: "createExternalParty", element: <CreateExternalParty /> },
      {
        path: "editExternalParty/:id",
        element: <EditExternalParty />,
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

      //? -------------------------------- BCP --------------------------------------
      // * Business Continuity Plan Layout
      {
        path: "Business-Continuity-Plan",
        element: <BusinessContinuityPlanLayout />,
        children: [
          { path: "bcp-form", element: <BCPForm /> },
          { path: "document-control", element: <DocumentControl /> },
          { path: "recovery-strategy", element: <RecoveryStrategy /> },
          {
            path: "legal-regulatory-&-contractual-requirements",
            element: <LegalRequirements />,
          },
          {
            path: "pre-incident-preparation",
            element: <PreIncidentPreparation />,
          },
          {
            path: "critical-business-function",
            element: <CriticalBusinessFunction />,
          },
          { path: "resources-required", element: <ResourcesRequired /> },
          { path: "dependencies", element: <Dependencies /> },
          { path: "vital-records", element: <VitalRecords /> },
          { path: "work-area-recovery", element: <WorkAreaRecovery /> },
          { path: "manpower", element: <Manpower /> },
          {
            path: "recovery-and-resumption",
            element: <RecoveryAndResumption />,
          },
          { path: "embedded-documents", element: <EmbeddedDocuments /> },
        ],
      },
      { path: "createBCP", element: <CreateBCP /> },

      { path: "createRecoveryStrategy", element: <CreateRecoveryStrategy /> },
      // {path:"editRecoveryStrategy/:id",element:<EditRecoveryStrategy/>},

      { path: "createLegalRequirements", element: <CreateLegalRequirements /> },
      // {path:"editLegalRequirements/:id",element:<EditLegalRequirements/>},

      {
        path: "createPreIncidentPreparation",
        element: <CreatePreIncidentPreparation />,
      },
      // {path:"editPreIncidentPreparation/:id",element:<EditPreIncidentPreparation/>},

      {
        path: "createCriticalBusinessFunction",
        element: <CreateCriticalBusinessFunction />,
      },
      // {path:"editCriticalBusinessFunction/:id",element:<EditCriticalBusinessFunction/>},

      { path: "createResourcesRequired", element: <CreateResourcesRequired /> },
      // {path:"editResourcesRequired/:id",element:<EditResourcesRequired/>},

      { path: "createVitalRecord", element: <CreateVitalRecords /> },
      // {path:"editVitalRecords/:id",element:<EditVitalRecords/>},

      { path: "createWorkAreaRecovery", element: <CreateWorkAreaRecovery /> },
      // { path: "editWorkAreaRecovery/:id", element: <EditWorkAreaRecovery />},

      { path: "createEmbeddedDocument", element: <CreateEmbeddedDocuments /> },
      { path: "editEmbeddedDocument/:id", element: <EditEmbeddedDocuments /> },

      // BIA (Business Impact Analysis)
      {
        path: "Business-Impact-Analysis",
        element: <BiaLayout />,
        children: [
          { path: "bia-form", element: <BiaForm /> },
          { path: "document-version", element: <BiaDocumentControl /> },
          //{ path: "operating-sites", element: <BiaOperatingSites /> },
          // { path: "critical-business-function", element: <BiaCriticalBusinessFunction /> },
          {
            path: "business-peaks-and-deadlines",
            element: <BiaPeaksAndDeadlines />,
          },
          //{ path: "resources", element: <BiaResources /> },
          { path: "impact-analysis", element: <BiaImpactAnalysis /> },
          { path: "resources-required", element: <BiaResourcesRequired /> },
          //{ path: "dependencies", element: <BiaDependencies /> },
          //{ path: "work-area-recovery", element: <BiaWorkAreaRecovery /> },
          //{ path: "manpower", element: <BiaManpower /> },
        ],
      },

      // Roles
      { path: "roles", element: <Roles /> },
      { path: "roles/createRoles", element: <CreateRoles /> },
      { path: "roles/editRoles", element: <EditRoles /> },
    ],
  },

  {
    path: "*",
    // element: <ErrorPage />,
  },
]);

export default router;
