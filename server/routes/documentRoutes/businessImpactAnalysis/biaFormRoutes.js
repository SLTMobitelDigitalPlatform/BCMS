const express = require("express");
const {
  createBIAForm,
  getBIAForms,
  getLastbiaForm,
  getbiaFormByBIAID,
  getbiaFormById,
  updatebiaFormByBIAID,
  updatebiaForm,
  deletebiaForm,
} = require("../../../controllers/documentController/businessImpactAnalysis/biaFormController");

const router = express.Router();

router.post("/api/biaForms/add", createBIAForm);

router.get("/api/biaForms/", getBIAForms);

router.get("/api/biaForms/last/:template", getLastbiaForm);

router.get("/api/biaForms/:biaid", getbiaFormByBIAID);

router.get("/api/biaForms/:id", getbiaFormById);

router.put("/api/biaForms/edit/:biaid", updatebiaFormByBIAID);

router.put("/api/biaForms/edit/:id", updatebiaForm);

router.delete("/api/biaForms/delete/:id", deletebiaForm);

module.exports = router;