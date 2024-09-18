const express = require("express");
const {
  createPreIncidentPreparation,
  getAllPreIncidentPreparation,
  getLastPreIncidentPreparation,
  getPreIncidentPreparationById,
  updatePreIncidentPreparation,
  deletePreIncidentPreparation,
} = require("../../../controllers/documentController/bcp/preIncidentPreparationController");

const router = express.Router();

router.post("/api/bcpPreIncidentPreparation/add", createPreIncidentPreparation);

router.get("/api/bcpPreIncidentPreparation", getAllPreIncidentPreparation);

router.get(
  "/api/bcpPreIncidentPreparation/last",
  getLastPreIncidentPreparation
);

router.get("/api/bcpPreIncidentPreparation/:id", getPreIncidentPreparationById);

router.put(
  "/api/bcpPreIncidentPreparation/edit/:id",
  updatePreIncidentPreparation
);

router.delete(
  "/api/bcpPreIncidentPreparation/delete/:id",
  deletePreIncidentPreparation
);

module.exports = router;
