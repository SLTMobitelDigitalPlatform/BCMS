const express = require("express");
const {
  createResource,
  getAllResources,
  getResourceByBIAID,
  getLastResource,
  getResourceByIds,
  updateResource,
  deleteResource,
} = require("../../../controllers/documentController/businessImpactAnalysis/resourcesController");

const router = express.Router();

router.post("/api/biaResource/add", createResource);

router.get("/api/biaResource", getAllResources);

router.get("/api/biaResource/:biaid", getResourceByBIAID);

router.get("/api/biaResource/:biaid/:id", getResourceByIds);

router.get("/api/biaResource/last", getLastResource);

router.put("/api/biaResource/edit/:id", updateResource);

router.delete("/api/biaResource/delete/:id", deleteResource);

module.exports = router;
