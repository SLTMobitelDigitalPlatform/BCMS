const express = require("express");

const {
  createDocumentControl,
  getAllDocumentControls,
  getDocumentControlByBCPID,
  getDocumentControlByIds,
  getLastDocumentControl,
  updateDocumentControl,
  deleteDocumentControl,
} = require("../../../controllers/documentController/bcp/documentControlController");

const router = express.Router();

router.post("/api/bcpDocumentControl/add", createDocumentControl);

router.get("/api/bcpDocumentControl", getAllDocumentControls);

router.get("/api/bcpDocumentControl/:bcpid", getDocumentControlByBCPID);

router.get("/api/bcpDocumentControl/:bcpid/:id", getDocumentControlByIds);

router.get("/api/bcpDocumentControl/last", getLastDocumentControl);

router.put("/api/bcpDocumentControl/edit/:id", updateDocumentControl);

router.delete("/api/bcpDocumentControl/delete/:id", deleteDocumentControl);

module.exports = router;
