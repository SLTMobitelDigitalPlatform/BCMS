const express = require("express");
const router = express.Router();
const riskAssesmentBCPControllers = require("../../controllers/documentController/riskAssesment/riskAssesementBCPController");
const authControllers = require("../../controllers/userControllers/authController");

router.post("/api/risksBCP/add", riskAssesmentBCPControllers.createRisk);
router.get("/api/risksBCP/", riskAssesmentBCPControllers.getRisks);
router.get("/api/risksBCP/last", riskAssesmentBCPControllers.getLastRisk);
router.get("/api/risksBCP/:id", riskAssesmentBCPControllers.getRiskById);
router.put("/api/risksBCP/edit/:id", riskAssesmentBCPControllers.updateRisk);
router.delete(
  "/api/risksBCP/delete/:id",
  riskAssesmentBCPControllers.deleteRisk
);

module.exports = router;
