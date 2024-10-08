const express = require("express");

const {
  createExternalDependency,
  getAllExternalDependenciesByBIAID,
  getExternalDependencyByIds,
  updateExternalDependency,
  deleteExternalDependency,
} = require("../../../controllers/documentController/businessImpactAnalysis/externalDependenciesController");

const router = express.Router();

router.post(
  "/api/biaExternalDependencies/add", createExternalDependency
);

router.get(
  "/api/biaExternalDependencies/:biaid", getAllExternalDependenciesByBIAID
);

router.get(
  "/api/biaExternalDependencies/:biaid/:id", getExternalDependencyByIds
);

router.put(
  "/api/biaExternalDependencies/edit/:id", updateExternalDependency
);

router.delete(
  "/api/biaExternalDependencies/delete/:id", deleteExternalDependency
);

module.exports = router;
