const express = require("express");

const {
  createDocumentControl,
  getAllDocumentControls,
  getDocumentControlByBCPID,
} = require("../../../controllers/documentController/bcp/documentControlController");

const router = express.Router();

router.post("/api/bcpDocumentControl/add", createDocumentControl);

router.get("/api/bcpDocumentControl", getAllDocumentControls);

router.get("/api/bcpDocumentControl/:bcpid", getDocumentControlByBCPID);

module.exports = router;
