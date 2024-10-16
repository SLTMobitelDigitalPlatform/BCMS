import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./auth/ProtectedRoute";
import Profile from "./components/Profile";
import Calendar from "./pages/calendar/Calendar";
import UpdateEvent from "./pages/calendar/UpdateEvent";
import CallTreeTable from "./pages/Call Tree/CallTreeTable";
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
import BiaPlans from "./pages/documents/BIA/BusinessImpactAnalysisPlans";
import BiaLayout from "./pages/documents/BIA/BiaLayout";
import BiaForm from "./pages/documents/BIA/BIAForm/BiaForm";
import CreateBIAForm from "./pages/documents/BIA/BIAForm/CreateBIAForm";
import EditBIAForm from "./pages/documents/BIA/BIAForm/EditBIAForm";
// BIA Operating Sites
import BiaOperatingSites from "./pages/documents/BIA/OperatingSites/operatingSites";
import CreateBIAOSites from "./pages/documents/BIA/OperatingSites/CreateOperatingSites";
import EditBIAOSites from "./pages/documents/BIA/OperatingSites/EditoperatingSites";
//BIA Peaks And Deadlines
import BiaPeaksAndDeadlines from "./pages/documents/BIA/Peak&Deadlines/peaksDeadlines";
import CreatePeaksAndDeadlines from "./pages/documents/BIA/Peak&Deadlines/CreatePeaksDeadlines";
import EditPeaksAndDeadlines from "./pages/documents/BIA/Peak&Deadlines/EditPeaksDeadlines";
//BIA Resources
import BiaResources from "./pages/documents/BIA/Resources/Resource";
import CreateBiaResources from "./pages/documents/BIA/Resources/CreateResources";
import EditBiaResources from "./pages/documents/BIA/Resources/EditResources";
//BIA Critical Business Function
import BiaCriticalBusinessFunction from "./pages/documents/BIA/BIACriticalBusinessFunction/CriticalBusinessFunction";
import CreateBiaCBF from "./pages/documents/BIA/BIACriticalBusinessFunction/CreateCriticalBusinessFunction";
import EditBiaCBF from "./pages/documents/BIA/BIACriticalBusinessFunction/EditCriticalBusinessFunction";
//BIA Dependencies
import BiaDependencies from "./pages/documents/BIA/Dependencies/DependenciesLayout";
import CreateBiaExternalDependencies from "./pages/documents/BIA/Dependencies/External Dependencies/CreateExternalDependencies";
import CreateBiaUpstream from "./pages/documents/BIA/Dependencies/Internal Dependencies/CreateUpstream";
import CreateBiaDownstream from "./pages/documents/BIA/Dependencies/Internal Dependencies/CreateDownstream";

import BiaDocumentControl from "./pages/documents/BIA/BIADocumentControl/BiaDocumentControl";
import BiaImpactAnalysis from "./pages/documents/BIA/Impact Analysis/impactAnalysis";
import BiaResourcesRequired from "./pages/documents/BIA/ResourcesRequired";
import BiaWorkAreaRecovery from "./pages/documents/BIA/Work Area Recovery/workAreaRecovery";
import BiaManpower from "./pages/documents/BIA/Manpower/manpower";

import CreateBCP from "./pages/documents/BCP/BCPForm/CreateBCP";
import EditBCPForm from "./pages/documents/BCP/BCPForm/EditBCPForm";
import CreateCriticalBusinessFunction from "./pages/documents/BCP/Critical Business Function/CreateCriticalBusinessFunction";
import CreateEmbeddedDocuments from "./pages/documents/BCP/Embedded Documents/CreateEmbeddedDocuments";
import EditEmbeddedDocuments from "./pages/documents/BCP/Embedded Documents/EditEmbeddedDocuments";
import CreateLegalRequirements from "./pages/documents/BCP/Legal Requirements/CreateLegalRequirements";
import CreatePreIncidentPreparation from "./pages/documents/BCP/Pre-Incident Preparation/CreatePreIncidentPreparation";
import EditPreIncidentPreparation from "./pages/documents/BCP/Pre-Incident Preparation/EditPreIncidentPreparation";
import CreateRecoveryStrategy from "./pages/documents/BCP/Recovery Strategy/CreateRecoveryStrategy";
import CreateResourcesRequired from "./pages/documents/BCP/Resources Required/CreateResourcesRequired";
import CreateVitalRecords from "./pages/documents/BCP/Vital Records/CreateVitalRecords";
import CreateWorkAreaRecovery from "./pages/documents/BCP/Work Area Recovery/CreateWorkAreaRecovery";
import AddEditTeams from "./pages/teams/AddEditTeams";
import TeamList from "./pages/teams/TeamList";

import CallTree from "./pages/Call Tree/CallTree";
import BusinessContinuityPlans from "./pages/documents/BCP/BusinessContinuityPlans";
import EditCriticalBusinessFunction from "./pages/documents/BCP/Critical Business Function/EditCriticalBusinessFunction";
import CreateDocumentControl from "./pages/documents/BCP/Document Control/CreateDocumentControl";
import EditDocumentControl from "./pages/documents/BCP/Document Control/EditDocumentControl";
import EditLegalRequirements from "./pages/documents/BCP/Legal Requirements/EditLegalRequirements";
import EditRecoveryStrategy from "./pages/documents/BCP/Recovery Strategy/EditRecoveryStrategy";
import CreateRelatedDocuments from "./pages/documents/BCP/Related Documents/CreateRelatedDocuments";
import EditRelatedDocuments from "./pages/documents/BCP/Related Documents/EditRelatedDocuments";
import RelatedDocuments from "./pages/documents/BCP/Related Documents/RelatedDocuments";
import EditResourcesRequired from "./pages/documents/BCP/Resources Required/EditResourcesRequired";
import EditVitalRecords from "./pages/documents/BCP/Vital Records/EditVitalRecords";
import EditWorkAreaRecovery from "./pages/documents/BCP/Work Area Recovery/EditWorkAreaRecovery";
import CreateExternalDependencies from "./pages/documents/BCP/Dependencies/External Dependencies/CreateExternalDependencies";
import CreateUpstream from "./pages/documents/BCP/Dependencies/Internal Dependencies/CreateUpstream";
import CreateDownstream from "./pages/documents/BCP/Dependencies/Internal Dependencies/CreateDownstream";
import OrgCallTree from "./pages/Call Tree/OrgCallTree";
import OrgCallTreeTable from "./pages/Call Tree/OrgCallTreeTable";
import CallTreeHomePage from "./pages/Call Tree/CallTreeHomePage";
import CreateRecoveryResumption from "./pages/documents/BCP/Recovery and Resumption/CreateRecoveryResumption";
import EditRecoveryResumption from "./pages/documents/BCP/Recovery and Resumption/EditRecoveryResumption";
import EditExternalDependencies from "./pages/documents/BCP/Dependencies/External Dependencies/EditExternalDependencies";
import EditUpstream from "./pages/documents/BCP/Dependencies/Internal Dependencies/EditUpstream";
import EditDownstream from "./pages/documents/BCP/Dependencies/Internal Dependencies/EditDownstream";

import PoliciesHomePage from "./pages/Policies/PoliciesHomePage";
import TeamsDocuments from "./pages/Policies/TeamsDocuments/TeamsDocuments";
import OtherDocuments from "./pages/Policies/OtherDocuments/OtherDocuments";
import ViewPolicyPage from "./pages/Policies/OrganizationalPolicies/ViewPolicyPage";
import AddDocument from "./pages/Policies/OrganizationalPolicies/AddDocument";
import PoliciesPage from "./pages/Policies/OrganizationalPolicies/OrgPolicies";

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
        path: "/feedbacks",
        element: <FeedbackList />,
        errorElement: <ErrorPage />,
      },

      // Policies
      { path: "policies", element: <PoliciesPage /> },
      { path: "viewPolicy/:id", element: <ViewPolicyPage /> },
      { path: "policies/add-document", element: <AddDocument /> },

      //Teams
      { path: "teams", element: <AddEditTeams /> },
      { path: "teams/teamList", element: <TeamList /> },
      { path: "teams/:teamId", element: <AddEditTeams /> },

      // Customer Table
      { path: "customers", element: <Customer /> },

      // Sections
      { path: "sections", element: <Section /> },

      // Call Tree
      { path: "call-tree-home", element: <CallTreeHomePage /> },

      { path: "call-tree", element: <CallTree /> },
      { path: "call-tree-table", element: <CallTreeTable /> },

      // Oganizational Call Tree
      { path: "org-call-tree", element: <OrgCallTree /> },
      { path: "org-call-tree-table", element: <OrgCallTreeTable /> },

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

      //Policies
      { path: "policiesHome", element: <PoliciesHomePage /> },
      { path: "teamsDoc", element: <TeamsDocuments /> },
      { path: "otherDoc", element: <OtherDocuments /> },

      { path: "policies/add-document", element: <AddDocument /> },

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
        path: "business-continuity-plans",
        element: <BusinessContinuityPlans />,
      },
      {
        path: "Business-Continuity-Plan",
        element: <BusinessContinuityPlanLayout />,
        children: [
          { path: "bcp-form/:bcpid", element: <BCPForm /> },
          { path: "document-control/:bcpid", element: <DocumentControl /> },
          { path: "related-documents/:bcpid", element: <RelatedDocuments /> },
          { path: "recovery-strategy/:bcpid", element: <RecoveryStrategy /> },
          {
            path: "legal-requirements/:bcpid",
            element: <LegalRequirements />,
          },
          {
            path: "pre-incident-preparation/:bcpid",
            element: <PreIncidentPreparation />,
          },
          {
            path: "critical-business-function/:bcpid",
            element: <CriticalBusinessFunction />,
          },
          {
            path: "recovery-and-resumption/:bcpid",
            element: <RecoveryAndResumption />,
          },
          { path: "resources-required/:bcpid", element: <ResourcesRequired /> },
          { path: "dependencies/:bcpid", element: <Dependencies /> },
          { path: "vital-records/:bcpid", element: <VitalRecords /> },
          { path: "work-area-recovery/:bcpid", element: <WorkAreaRecovery /> },
          { path: "manpower/:bcpid", element: <Manpower /> },
          { path: "embedded-documents/:bcpid", element: <EmbeddedDocuments /> },
        ],
      },
      // * BCP Form
      { path: "createBCP", element: <CreateBCP /> },
      { path: "editBCP/:bcpid", element: <EditBCPForm /> },

      // * Document Control
      {
        path: "createDocumentControl/:bcpid",
        element: <CreateDocumentControl />,
      },
      {
        path: "editDocumentControl/:bcpid/:id",
        element: <EditDocumentControl />,
      },

      // * Related Documents
      {
        path: "createRelatedDocument/:bcpid",
        element: <CreateRelatedDocuments />,
      },
      {
        path: "editRelatedDocument/:bcpid/:id",
        element: <EditRelatedDocuments />,
      },

      // * Recovery Strategy
      {
        path: "createRecoveryStrategy/:bcpid",
        element: <CreateRecoveryStrategy />,
      },
      {
        path: "editRecoveryStrategy/:bcpid/:id",
        element: <EditRecoveryStrategy />,
      },

      // * Legal Requirements
      {
        path: "createLegalRequirements/:bcpid",
        element: <CreateLegalRequirements />,
      },
      {
        path: "editLegalRequirements/:bcpid/:id",
        element: <EditLegalRequirements />,
      },

      // * Pre-Incident Preparation
      {
        path: "createPreIncidentPreparation/:bcpid",
        element: <CreatePreIncidentPreparation />,
      },
      {
        path: "editPreIncidentPreparation/:bcpid/:id",
        element: <EditPreIncidentPreparation />,
      },

      // * Critical Business Function
      {
        path: "createCriticalBusinessFunction/:bcpid",
        element: <CreateCriticalBusinessFunction />,
      },
      {
        path: "editCriticalBusinessFunction/:bcpid/:id",
        element: <EditCriticalBusinessFunction />,
      },

      // * Recovery And Resumption
      {
        path: "createRecoveryResumption/:bcpid",
        element: <CreateRecoveryResumption />,
      },
      {
        path: "editRecoveryResumption/:bcpid/:id",
        element: <EditRecoveryResumption />,
      },

      // * Resources Required
      {
        path: "createResourcesRequired/:bcpid",
        element: <CreateResourcesRequired />,
      },
      {
        path: "editResourcesRequired/:bcpid/:id",
        element: <EditResourcesRequired />,
      },

      // * Dependencies
      {
        path: "createExternalDependencies/:bcpid",
        element: <CreateExternalDependencies />,
      },
      {
        path: "editExternalDependencies/:bcpid/:id",
        element: <EditExternalDependencies />,
      },

      { path: "createUpstream/:bcpid", element: <CreateUpstream /> },

      { path: "editUpstream/:bcpid/:id", element: <EditUpstream /> },
      { path: "createDownstream/:bcpid", element: <CreateDownstream /> },

      { path: "editDownstream/:bcpid/:id", element: <EditDownstream /> },

      // * Vital Records
      { path: "createVitalRecord/:bcpid", element: <CreateVitalRecords /> },
      { path: "editVitalRecords/:bcpid/:id", element: <EditVitalRecords /> },

      // * Work Area Recovery
      {
        path: "createWorkAreaRecovery/:bcpid",
        element: <CreateWorkAreaRecovery />,
      },
      {
        path: "editWorkAreaRecovery/:bcpid/:id",
        element: <EditWorkAreaRecovery />,
      },

      // * Manpower
      // { path: "createManpower", element: <CreateManpower /> },
      // { path: "editManpower/:id", element: <EditManpower /> },

      // * Recovery And Resumption

      // * Embedded Documents
      {
        path: "createEmbeddedDocument/:bcpid",
        element: <CreateEmbeddedDocuments />,
      },
      {
        path: "editEmbeddedDocument/:bcpid/:id",
        element: <EditEmbeddedDocuments />,
      },

      // -------------------------------- BIA (Business Impact Analysis)--------------------------------
      //Layout
      { path: "business-impact-analysis-plans", element: <BiaPlans /> },
      {
        path: "Business-Impact-Analysis",
        element: <BiaLayout />,
        children: [
          { path: "bia-form/:biaid", element: <BiaForm /> },
          { path: "operating-sites/:biaid", element: <BiaOperatingSites /> },
          {
            path: "business-peaks-and-deadlines/:biaid",
            element: <BiaPeaksAndDeadlines />,
          },
          {
            path: "business-peaks-and-deadlines/:biaid",
            element: <BiaPeaksAndDeadlines />,
          },
          { path: "resources/:biaid", element: <BiaResources /> },
          {
            path: "critical-business-function/:biaid",
            element: <BiaCriticalBusinessFunction />,
          },
          {
            path: "critical-business-function/:biaid",
            element: <BiaCriticalBusinessFunction />,
          },

          { path: "document-version/:biaid", element: <BiaDocumentControl /> },
          { path: "impact-analysis/:biaid", element: <BiaImpactAnalysis /> },
          {
            path: "resources-required/:biaid",
            element: <BiaResourcesRequired />,
          },
          {
            path: "resources-required/:biaid",
            element: <BiaResourcesRequired />,
          },
          { path: "dependencies/:biaid", element: <BiaDependencies /> },
          {
            path: "work-area-recovery/:biaid",
            element: <BiaWorkAreaRecovery />,
          },
          {
            path: "work-area-recovery/:biaid",
            element: <BiaWorkAreaRecovery />,
          },
          { path: "manpower/:biaid", element: <BiaManpower /> },
        ],
      },

      //BIA Form
      { path: "createBIA", element: <CreateBIAForm /> },
      { path: "editBIA/:biaid", element: <EditBIAForm /> },
      //Operating Sites
      { path: "createOperatingSites/:biaid", element: <CreateBIAOSites /> },
      { path: "editOperatingSites/:biaid/:id", element: <EditBIAOSites /> },
      //Peaks and Deadliness
      {
        path: "createPeaksDeadlines/:biaid",
        element: <CreatePeaksAndDeadlines />,
      },
      {
        path: "editPeaksDeadlines/:biaid/:id",
        element: <EditPeaksAndDeadlines />,
      },
      {
        path: "createPeaksDeadlines/:biaid",
        element: <CreatePeaksAndDeadlines />,
      },
      {
        path: "editPeaksDeadlines/:biaid/:id",
        element: <EditPeaksAndDeadlines />,
      },
      //Resources
      { path: "createResources/:biaid", element: <CreateBiaResources /> },
      { path: "editResources/:biaid/:id", element: <EditBiaResources /> },
      //Critical Business Function
      {
        path: "createBIACriticalBusinessFunction/:biaid",
        element: <CreateBiaCBF />,
      },
      {
        path: "editBIACriticalBusinessFunction/:biaid/:id",
        element: <EditBiaCBF />,
      },
      {
        path: "createBIACriticalBusinessFunction/:biaid",
        element: <CreateBiaCBF />,
      },
      {
        path: "editBIACriticalBusinessFunction/:biaid/:id",
        element: <EditBiaCBF />,
      },
      //Dependency
      {
        path: "createBIAExternalDependencies/:biaid",
        element: <CreateBiaExternalDependencies />,
      },
      {
        path: "createBIAExternalDependencies/:biaid",
        element: <CreateBiaExternalDependencies />,
      },
      { path: "createBIAUpstream/:biaid", element: <CreateBiaUpstream /> },
      { path: "createBIADownstream/:biaid", element: <CreateBiaDownstream /> },

      { path: "severityLevel", element: <BiaImpactAnalysis /> },

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
