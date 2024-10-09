const express = require("express");
const {
  createBiaDocumentControl,
  getAllBiaDocumentControl,
  getBiaDocumentControlByBIAID,
  getLastBiaDocumentControl,
  getBiaDocumentControlByIds,
  updateBiaDocumentControl,
  deleteBiaDocumentControl,
} = require("../../../controllers/documentController/businessImpactAnalysis/biaDocumentControlController");

const router = express.Router();

router.post("/api/biaDocumentControl/add", createBiaDocumentControl);

router.get("/api/biaDocumentControl", getAllBiaDocumentControl);

router.get("/api/biaDocumentControl/:biaid", getBiaDocumentControlByBIAID);

router.get("/api/biaDocumentControl/:biaid/:id", getBiaDocumentControlByIds);

router.get("/api/biaDocumentControl/last", getLastBiaDocumentControl);

router.put("/api/biaDocumentControl/edit/:id", updateBiaDocumentControl);

router.delete("/api/biaDocumentControl/delete/:id", deleteBiaDocumentControl);

module.exports = router;
