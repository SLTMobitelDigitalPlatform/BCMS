const express = require("express");

const {
  createRecoveryStrategy,
  getRecoveryStrategiesByBCPID,
  getRecoveryStrategyByIds,
  updateRecoveryStrategy,
  deleteRecoveryStrategy,
} = require("../../../controllers/documentController/bcp/recoveryStrategyController");

const router = express.Router();

router.post("/api/bcpRecoveryStrategy/add", createRecoveryStrategy);

router.get("/api/bcpRecoveryStrategy/:bcpid", getRecoveryStrategiesByBCPID);

router.get("/api/bcpRecoveryStrategy/:bcpid/:id", getRecoveryStrategyByIds);

router.put("/api/bcpRecoveryStrategy/edit/:id", updateRecoveryStrategy);

router.delete("/api/bcpRecoveryStrategy/delete/:id", deleteRecoveryStrategy);

module.exports = router;
