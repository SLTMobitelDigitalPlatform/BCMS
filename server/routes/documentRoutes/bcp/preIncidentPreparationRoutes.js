const express = require("express");
const {
  createPreIncidentPreparation,
  getAllPreIncidentPreparation,
  getPreIncidentPreparationByBCPID,
  getPreIncidentPreparationByIds,
  getLastPreIncidentPreparation,

  updatePreIncidentPreparation,
  deletePreIncidentPreparation,
} = require("../../../controllers/documentController/bcp/preIncidentPreparationController");

const router = express.Router();

router.post("/api/bcpPreIncidentPreparation/add", createPreIncidentPreparation);

router.get("/api/bcpPreIncidentPreparation", getAllPreIncidentPreparation);

router.get(
  "/api/bcpPreIncidentPreparation/:bcpid",
  getPreIncidentPreparationByBCPID
);

router.get(
  "/api/bcpPreIncidentPreparation/:bcpid/:id",
  getPreIncidentPreparationByIds
);

router.get(
  "/api/bcpPreIncidentPreparation/last",
  getLastPreIncidentPreparation
);

router.put(
  "/api/bcpPreIncidentPreparation/edit/:id",
  updatePreIncidentPreparation
);

router.delete(
  "/api/bcpPreIncidentPreparation/delete/:id",
  deletePreIncidentPreparation
);

module.exports = router;
