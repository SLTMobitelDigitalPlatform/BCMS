const express = require("express");
const {
  createVitalRecord,
  getAllVitalRecords,
  getVitalRecordsByBCPID,
  getVitalRecordByIds,
  getLastVitalRecord,
  updateVitalRecord,
  deleteVitalRecord,
} = require("../../../controllers/documentController/bcp/vitalRecordsController");

const router = express.Router();

router.post("/api/bcpVitalRecords/add", createVitalRecord);

router.get("/api/bcpVitalRecords", getAllVitalRecords);

router.get("/api/bcpVitalRecords/:bcpid", getVitalRecordsByBCPID);

router.get("/api/bcpVitalRecords/:bcpid/:id", getVitalRecordByIds);

router.get("/api/bcpVitalRecords/last", getLastVitalRecord);

router.put("/api/bcpVitalRecords/edit/:id", updateVitalRecord);

router.delete("/api/bcpVitalRecords/delete/:id", deleteVitalRecord);

module.exports = router;
