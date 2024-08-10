const express = require("express");
const router = express.Router();
const riskAssesmentControllers = require("../../controllers/documentController/riskAssesementController");
const authControllers = require("../../controllers/userControllers/authController");

router.post("/api/risks/add", riskAssesmentControllers.createRisk);
router.get("/api/risks/", riskAssesmentControllers.getRisks);
router.get("/api/risks/:id", riskAssesmentControllers.getRiskById);
router.put("/api/risks/edit/:id", riskAssesmentControllers.updateRisk);
router.delete("/api/risks/delete/:id", riskAssesmentControllers.deleteRisk);

module.exports = router;
