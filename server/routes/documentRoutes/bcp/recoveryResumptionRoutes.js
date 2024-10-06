const express = require("express");

const {
  createRecoveryResumption,
  getRecoveryResumptionsByBCPID,
  getRecoveryResumptionByIds,
  updateRecoveryResumption,
  deleteRecoveryResumption,
} = require("../../../controllers/documentController/bcp/recoveryResumptionController");

const router = express.Router();

router.post("/api/bcpRecoveryResumption/add", createRecoveryResumption);

router.get("/api/bcpRecoveryResumption/:bcpid", getRecoveryResumptionsByBCPID);

router.get("/api/bcpRecoveryResumption/:bcpid/:id", getRecoveryResumptionByIds);

router.put("/api/bcpRecoveryResumption/edit/:id", updateRecoveryResumption);

router.delete(
  "/api/bcpRecoveryResumption/delete/:id",
  deleteRecoveryResumption
);

module.exports = router;
