const express = require("express");
const bcpFormController = require("../../../controllers/documentController/bcp/bcpFormController");
const authControllers = require("../../controllers/userControllers/authController");
const router = express.Router();

router.post(
  "/api/businessContinuityPlanBCPForm/add",
  bcpFormController.createBCPForm
);
router.get(
  "/api/businessContinuityPlanBCPForm/last",
  bcpFormController.getLastbcpForm
);
router.get(
  "/api/businessContinuityPlanBCPForms/",
  bcpFormController.getBCPForms
);
router.get(
  "/api/businessContinuityPlanBCPForm/:id",
  bcpFormController.getbcpFormById
);

router.put(
  "/api/businessContinuityPlanBCPForm/edit/:id",
  bcpFormController.updatebcpForm
);
router.delete(
  "/api/businessContinuityPlanBCPForm/delete/:id",
  bcpFormController.deletebcpForm
);

module.exports = router;
