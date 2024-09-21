const express = require("express");
const {
  createEmbeddedDocument,
  getAllEmbeddedDocuments,
  getEmbeddedDocumentsByBCPID,
  getEmbeddedDocumentByIds,
  getLastEmbeddedDocument,
  updateEmbeddedDocument,
  deleteEmbeddedDocument,
} = require("../../../controllers/documentController/bcp/embeddedDocumentController");

const router = express.Router();

router.post("/api/bcpEmbeddedDocument/add", createEmbeddedDocument);

router.get("/api/bcpEmbeddedDocument", getAllEmbeddedDocuments);

router.get("/api/bcpEmbeddedDocument/:bcpid", getEmbeddedDocumentsByBCPID);

router.get("/api/bcpEmbeddedDocument/:bcpid/:id", getEmbeddedDocumentByIds);

router.get("/api/bcpEmbeddedDocument/last", getLastEmbeddedDocument);

router.put("/api/bcpEmbeddedDocument/edit/:id", updateEmbeddedDocument);

router.delete("/api/bcpEmbeddedDocument/delete/:id", deleteEmbeddedDocument);

module.exports = router;
