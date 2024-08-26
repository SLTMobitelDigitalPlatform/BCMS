const express = require("express");
const versionControlRiskController = require("../../controllers/documentController/riskAssesment/versionControlRiskController");
const authControllers = require("../../controllers/userControllers/authController");
const router = express.Router();

router.post(
  "/api/versionControlsRisk/add",
  versionControlRiskController.createVersionControl
);
router.get(
  "/api/versionControlsRisks/",
  versionControlRiskController.getVersionControls
);
router.get(
  "/api/versionControlsRisk/:id",
  versionControlRiskController.getVersionById
);
router.put(
  "/api/versionControlsRisk/edit/:id",
  versionControlRiskController.updateVersion
);
router.delete(
  "/api/versionControlsRisk/delete/:id",
  versionControlRiskController.deleteVersion
);

module.exports = router;
