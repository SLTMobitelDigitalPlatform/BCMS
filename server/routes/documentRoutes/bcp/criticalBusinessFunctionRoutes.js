const express = require("express");

const {
  createCriticalBusinessFunction,
  getCriticalBusinessFunctionsByBCPID,
  getCriticalBusinessFunctionByIds,
  updateCriticalBusinessFunction,
  deleteCriticalBusinessFunction,
} = require("../../../controllers/documentController/bcp/criticalBusinessFunctionController");

const router = express.Router();

router.post(
  "/api/bcpCriticalBusinessFunction/add",
  createCriticalBusinessFunction
);

router.get(
  "/api/bcpCriticalBusinessFunction/:bcpid",
  getCriticalBusinessFunctionsByBCPID
);

router.get(
  "/api/bcpCriticalBusinessFunction/:bcpid/:id",
  getCriticalBusinessFunctionByIds
);

router.put(
  "/api/bcpCriticalBusinessFunction/edit/:id",
  updateCriticalBusinessFunction
);

router.delete(
  "/api/bcpCriticalBusinessFunction/delete/:id",
  deleteCriticalBusinessFunction
);

module.exports = router;
