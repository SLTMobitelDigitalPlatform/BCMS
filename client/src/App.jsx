import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Employee from "./pages/Employees/Employee";
import Calendar from "./pages/calendar/Calendar";
import Meeting from "./pages/meetings/Meeting";
import Roles from "./pages/Roles_Responsibilities/Roles";
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
    <BrowserRouter>
      <div className="fixed w-full z-50">
        <Navbar />
      </div>
      <div className="flex gap-x-10">
        <div className="fixed z-50 mt-20">
          <Sidebar />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/meeting" element={<Meeting />} />
          <Route path="/roles" element={<Roles />} />
          {/* Documents - Risk Assesement */}
          <Route path="/riskAssesements" element={<RiskAssesement />} />
          <Route path="/createRisk" element={<CreateRiskAssesement />} />
          <Route path="/editRisk/:id" element={<EditRiskAssesement />} />
          {/* Documents End - Risk Assesement */}
          {/* Documents - Context of the organization */}
          <Route path="/versionControls" element={<VersionControls />} />
          <Route path="/createVersion" element={<CreateVersionControl />} />
          <Route path="/editVersion/:id" element={<EditVersionControl />} />
          <Route path="/objectives" element={<Objectives />} />
          <Route path="/interfaces" element={<InterfacesDependencies />} />
          <Route path="/masterProcedures" element={<MasterProcedures />} />
          <Route path="/internalIssues" element={<InternalIssues />} />
          <Route path="/externalIssues" element={<ExternalIssues />} />
          {/* Documents End - Context of the organization */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
