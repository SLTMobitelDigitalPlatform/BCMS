const express = require("express");
const router = express.Router();
const internalIssueController = require("../../controllers/documentController/contextOfOrganization/internalIssueController");
const authControllers = require("../../controllers/userControllers/authController");

router.post(
  "/internalIssue/create",
  internalIssueController.createInternalIssue
);

router.get("/internalIssues", internalIssueController.getInternalIssues);

router.get("/internalIssue/:id", internalIssueController.getInternalIssueById);

router.put(
  "/internalIssue/edit/:id",
  internalIssueController.updateInternalIssue
);

router.delete(
  "/internalIssue/delete/:id",
  internalIssueController.deleteInternalIssue
);

module.exports = router;
