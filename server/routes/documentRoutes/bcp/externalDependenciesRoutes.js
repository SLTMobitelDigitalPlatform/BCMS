const express = require("express");

const {
  createExternalDependency,
  getAllExternalDependenciesByBCPID,
  getExternalDependencyByIds,
  updateExternalDependency,
  deleteExternalDependency,
} = require("../../../controllers/documentController/bcp/externalDependenciesController");

const router = express.Router();

router.post("/api/bcpExternalDependencies/add", createExternalDependency);

router.get(
  "/api/bcpExternalDependencies/:bcpid",
  getAllExternalDependenciesByBCPID
);

router.get(
  "/api/bcpExternalDependencies/:bcpid/:id",
  getExternalDependencyByIds
);

router.put("/api/bcpExternalDependencies/edit/:id", updateExternalDependency);

router.delete(
  "/api/bcpExternalDependencies/delete/:id",
  deleteExternalDependency
);

module.exports = router;
