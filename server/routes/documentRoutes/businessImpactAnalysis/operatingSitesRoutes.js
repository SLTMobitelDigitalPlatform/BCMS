const express = require("express");
const {
  createOperatingSite,
  getAllOperatingSites,
  getOperatingSiteByBIAID,
  getLastOperatingSite,
  getOperatingSiteByIds,
  updateOperatingSite,
  deleteOperatingSite,
} = require("../../../controllers/documentController/businessImpactAnalysis/operatingSitesController");

const router = express.Router();

router.post("/api/biaOperatingSite/add", createOperatingSite);

router.get("/api/biaOperatingSite", getAllOperatingSites);

router.get("/api/biaOperatingSite/:biaid", getOperatingSiteByBIAID);

router.get("/api/biaOperatingSite/:biaid/:id", getOperatingSiteByIds);

router.get("/api/biaOperatingSite/last", getLastOperatingSite);

router.put("/api/biaOperatingSite/edit/:id", updateOperatingSite);

router.delete("/api/biaOperatingSite/delete/:id", deleteOperatingSite);

module.exports = router;
