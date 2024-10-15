const express = require("express");
const router = express.Router();
const qualityManagementController = require("../../controllers/documentController/riskAssesment/qualityManagementController");
const authControllers = require("../../controllers/userControllers/authController");

router.post("/api/qualityRisks/add", qualityManagementController.createRisk);
router.get("/api/qualityRisks/", qualityManagementController.getRisks);
router.get(
  "/api/qualityRisks/last/:section",
  qualityManagementController.getLastRisk
);
router.get("/api/qualityRisks/:id", qualityManagementController.getRiskById);
router.put(
  "/api/qualityRisks/edit/:id",
  qualityManagementController.updateRisk
);
router.delete(
  "/api/qualityRisks/delete/:id",
  qualityManagementController.deleteRisk
);

module.exports = router;
