require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const fs = require("fs");

require("./db/connectToDb");

const router = require("./routes/userRoutes/userRoutes");
const routerMeeting = require("./routes/meetingRoutes/meetingRoutes");
const routerRoles = require("./routes/meetingRoutes/roleRoutes");
const routerAction = require("./routes/meetingRoutes/actionRoute");
const routerAttendee = require("./routes/meetingRoutes/attendeeRoute");
const routerAboutMe = require("./routes/meetingRoutes/aboutMeRoute");
const routerHome = require("./routes/homeRoutes/homeRoutes");
const routerEvent = require("./routes/eventRoutes/EventRoutes");
const routerRisk = require("./routes/documentRoutes/riskAssesemetRoutes");
const routerVersion = require("./routes/documentRoutes/versionControlRoutes");
const routerFeedback = require("./routes/homeRoutes/feedbackRoutes");
const routerCustomer = require("./routes/customerRoutes/customerRoutes");
const routerObjective = require("./routes/documentRoutes/objectiveRoutes");
const routerExternalIssue = require("./routes/documentRoutes/externalIssueRoutes");
const routerInternalIssue = require("./routes/documentRoutes/internalIssueRoutes");
const routerInterfaceDependancy = require("./routes/documentRoutes/interfaceDependancyRoutes");
const routerProceduresAndProcess = require("./routes/documentRoutes/proceduresAndProcessRoutes");
const routerRiskIS = require("./routes/documentRoutes/riskAssesemetISRoutes");
const routerRiskBCP = require("./routes/documentRoutes/riskAssesemetBCPRoutes");
const routerRiskVersion = require("./routes/documentRoutes/versionControlRiskRoutes");
const routerRiskResidual = require("./routes/documentRoutes/residualRiskRoutes");
const routerRiskQuality = require("./routes/documentRoutes/qualityManagementRoutes");
const routerRiskElements = require("./routes/documentRoutes/riskAssesment/riskElementRoutes");
const routerExternalParty = require("./routes/documentRoutes/contexOfOrgRoutes/externalPartyRoutes");
const routerInternalParty = require("./routes/documentRoutes/contexOfOrgRoutes/internalPartyRoutes");
const routerCallTree = require("./routes/callTreeRoutes/callTreeRoutes");
const routerTeam = require("./routes/teamRoutes/teamRoutes");
const routerSection = require("./routes/sectionRoutes/sectionRoutes");

// Risk Assessment Routes

// Context of the Organization Routes

// Business Continuity Plan Routes
const routerBCPForm = require("./routes/documentRoutes/bcp/bcpFormRoutes");
const routerDocumentControl = require("./routes/documentRoutes/bcp/documentControlRoutes");
const routerRelatedDocuments = require("./routes/documentRoutes/bcp/relatedDocumentsRoutes");
const routerlegalRequirements = require("./routes/documentRoutes/bcp/legalRequirementRoutes");
const routerPreIncidentPreparation = require("./routes/documentRoutes/bcp/preIncidentPreparationRoutes");
const routerResourcesRequired = require("./routes/documentRoutes/bcp/resourcesRequiredRoutes");
const routerVitalRecords = require("./routes/documentRoutes/bcp/vitalRecordsRoutes");
const routerEmbeddedDocument = require("./routes/documentRoutes/bcp/embeddedDocumentRoutes");

// Business Impact Analysis Routes
const routerBiaForm = require("./routes/documentRoutes/businessImpactAnalysis/biaFormRoutes");

const PORT = 5000;

// middleware
app.use(express.json());
app.use(cors());
app.use(
  routerObjective,
  router,
  routerMeeting,
  routerRoles,
  routerAction,
  routerAttendee,
  routerAboutMe,
  routerHome,
  routerEvent,
  routerRisk,
  routerVersion,
  routerFeedback,
  routerCustomer,
  routerExternalIssue,
  routerInternalIssue,
  routerInterfaceDependancy,
  routerProceduresAndProcess,
  routerRiskIS,
  routerRiskBCP,
  routerRiskVersion,
  routerRiskResidual,
  routerRiskQuality,
  routerSection,
  routerRiskElements,
  routerExternalParty,
  routerInternalParty,
  routerCallTree,
  routerTeam,
  routerBCPForm,
  routerDocumentControl,
  routerRelatedDocuments,
  routerlegalRequirements,
  routerPreIncidentPreparation,
  routerResourcesRequired,
  routerVitalRecords,
  routerEmbeddedDocument,
  routerBiaForm
);

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Create uploads directory if it doesn't exist
const uploadDirCover = path.join(__dirname, "covers");
if (!fs.existsSync(uploadDirCover)) {
  fs.mkdirSync(uploadDirCover);
}

app.use("/uploads", express.static(uploadDir)); // Serve the uploads directory as a static folder
app.use("/covers", express.static(uploadDirCover));
app.use("/userImages", express.static(path.join(__dirname, "userImages")));

app.listen(PORT, () => {
  console.log(`Server start at Port No :${PORT}`);
});
