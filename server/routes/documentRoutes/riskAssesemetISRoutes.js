const express = require("express");
const router = express.Router();
const riskAssesmentISControllers = require("../../controllers/documentController/riskAssesment/riskAssesementISController");
const authControllers = require("../../controllers/userControllers/authController");

router.post("/api/risksIS/add", riskAssesmentISControllers.createRisk);
router.get("/api/risksIS/", riskAssesmentISControllers.getRisks);
router.get("/api/risksIS/last", riskAssesmentISControllers.getLastRisk);
router.get("/api/risksIS/:id", riskAssesmentISControllers.getRiskById);
router.put("/api/risksIS/edit/:id", riskAssesmentISControllers.updateRisk);
router.delete("/api/risksIS/delete/:id", riskAssesmentISControllers.deleteRisk);

module.exports = router;
