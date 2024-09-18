const express = require("express");
const {
  createResourcesRequired,
  getAllResourcesRequired,
  getLastResourcesRequired,
  getResourcesRequiredById,
  updateResourcesRequired,
  deleteResourcesRequired,
} = require("../../../controllers/documentController/bcp/resourcesRequiredController");

const router = express.Router();

router.post("/api/bcpResourcesRequired/add", createResourcesRequired);

router.get("/api/bcpResourcesRequired", getAllResourcesRequired);

router.get("/api/bcpResourcesRequired/last", getLastResourcesRequired);

router.get("/api/bcpResourcesRequired/:id", getResourcesRequiredById);

router.put("/api/bcpResourcesRequired/edit/:id", updateResourcesRequired);

router.delete("/api/bcpResourcesRequired/delete/:id", deleteResourcesRequired);

module.exports = router;
