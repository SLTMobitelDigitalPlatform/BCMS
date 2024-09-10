const express = require("express");
const router = express.Router();
const externalIssueController = require("../../controllers/documentController/contextOfOrganization/externalIssueController");
const authControllers = require("../../controllers/userControllers/authController");

router.post(
  "/externalIssue/create",
  externalIssueController.createExternalIssue
);

router.get("/externalIssues", externalIssueController.getExternalIssues);

router.get("/externalIssue/:id", externalIssueController.getExternalIssueById);

router.put(
  "/externalIssue/edit/:id",
  externalIssueController.updateExternalIssue
);

router.delete(
  "/externalIssue/delete/:id",
  externalIssueController.deleteExternalIssue
);

module.exports = router;
