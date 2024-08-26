const express = require("express");
const router = express.Router();
const residualRiskManagementController = require("../../controllers/documentController/riskAssesment/residualRiskManagementController");
const authControllers = require("../../controllers/userControllers/authController");

router.post(
  "/api/residualRisks/add",
  residualRiskManagementController.createRisk
);
router.get("/api/residualRisks/", residualRiskManagementController.getRisks);
router.get(
  "/api/residualRisks/last",
  residualRiskManagementController.getLastRisk
);
router.get(
  "/api/residualRisks/:id",
  residualRiskManagementController.getRiskById
);
router.put(
  "/api/residualRisks/edit/:id",
  residualRiskManagementController.updateRisk
);
router.delete(
  "/api/residualRisks/delete/:id",
  residualRiskManagementController.deleteRisk
);

module.exports = router;
