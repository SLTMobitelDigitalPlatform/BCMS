const express = require("express");
const router = express.Router();
const {
  createRisk,
  getRisks,
  getRiskById,
  updateRisk,
  deleteRisk,
} = require("../controllers/riskAssesementController");

router.post("/add", createRisk);
router.get("/", getRisks);
router.get("/:id", getRiskById);
router.put("/edit/:id", updateRisk);
router.delete("/delete/:id", deleteRisk);

module.exports = router;
