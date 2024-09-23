const express = require("express");

const {
  createWorkAreaRecovery,
  getWorkAreaRecoveriesByBCPID,
  getWorkAreaRecoveryByIds,
  updateWorkAreaRecovery,
  deleteWorkAreaRecovery,
} = require("../../../controllers/documentController/bcp/workAreaRecoveryController");

const router = express.Router();

router.post("/api/bcpWorkAreaRecovery/add", createWorkAreaRecovery);

router.get("/api/bcpWorkAreaRecovery/:bcpid", getWorkAreaRecoveriesByBCPID);

router.get("/api/bcpWorkAreaRecovery/:bcpid/:id", getWorkAreaRecoveryByIds);

router.put("/api/bcpWorkAreaRecovery/edit/:id", updateWorkAreaRecovery);

router.delete("/api/bcpWorkAreaRecovery/delete/:id", deleteWorkAreaRecovery);

module.exports = router;
