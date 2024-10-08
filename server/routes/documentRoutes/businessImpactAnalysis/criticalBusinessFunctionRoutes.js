const express = require("express");

const {
  createCriticalBusinessFunction,
  getCriticalBusinessFunctionsByBIAID,
  getCriticalBusinessFunctionByIds,
  updateCriticalBusinessFunction,
  deleteCriticalBusinessFunction,
} = require("../../../controllers/documentController/businessImpactAnalysis/criticalBusinessFunctionController");

const router = express.Router();

router.post(
  "/api/biaCriticalBusinessFunction/add",
  createCriticalBusinessFunction
);

router.get(
  "/api/biaCriticalBusinessFunction/:biaid",
  getCriticalBusinessFunctionsByBIAID
);

router.get(
  "/api/biaCriticalBusinessFunction/:biaid/:id",
  getCriticalBusinessFunctionByIds
);

router.put(
  "/api/biaCriticalBusinessFunction/edit/:id",
  updateCriticalBusinessFunction
);

router.delete(
  "/api/biaCriticalBusinessFunction/delete/:id",
  deleteCriticalBusinessFunction
);

module.exports = router;
