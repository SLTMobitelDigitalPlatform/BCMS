const express = require("express");
const {
  createBiaDocumentControl,
  getAllBiaDocumentControl,
  getBiaDocumentControlByBIAID,
  getLastBiaDocumentControl,
  getBiaDocumentControlByIds,
  updateBiaDocumentControl,
  deleteBiaDocumentControl,
} = require("../../../controllers/documentController/businessImpactAnalysis/BiaDocumentControlController");

const router = express.Router();

router.post("/api/BiaDocumentControl/add", createBiaDocumentControl);

router.get("/api/BiaDocumentControl", getAllBiaDocumentControl);

router.get("/api/BiaDocumentControl/:biaid", getBiaDocumentControlByBIAID);

router.get("/api/BiaDocumentControl/:biaid/:id", getBiaDocumentControlByIds);

router.get("/api/BiaDocumentControl/last", getLastBiaDocumentControl);

router.put("/api/BiaDocumentControl/edit/:id", updateBiaDocumentControl);

router.delete("/api/BiaDocumentControl/delete/:id", deleteBiaDocumentControl);

module.exports = router;
