const express = require("express");

const {
  createRelatedDocument,
  getRelatedDocumentsByBCPID,
  getRelatedDocumentByIds,
  updateRelatedDocument,
  deleteRelatedDocument,
} = require("../../../controllers/documentController/bcp/relatedDocumentsController");

const router = express.Router();

router.post("/api/bcpRelatedDocuments/add", createRelatedDocument);

router.get("/api/bcpRelatedDocuments/:bcpid", getRelatedDocumentsByBCPID);

router.get("/api/bcpRelatedDocuments/:bcpid/:id", getRelatedDocumentByIds);

router.put("/api/bcpRelatedDocuments/edit/:id", updateRelatedDocument);

router.delete("/api/bcpRelatedDocuments/delete/:id", deleteRelatedDocument);

module.exports = router;
