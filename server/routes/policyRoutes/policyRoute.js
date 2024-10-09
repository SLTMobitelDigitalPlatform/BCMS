const express = require("express");
const router = express.Router();
const policyController = require("../../controllers/policyController/policyController");
// const authControllers = require("../../controllers/userControllers/authController");

router.post("/policy/create", policyController.createPolicy);

router.get("/policies", policyController.getAllPolicies);

router.get("/policy/:id", policyController.getPolicyById);

router.get("/policies/last", policyController.getLastPolicy);

router.put("/policy/edit/:id", policyController.editPolicy);

router.patch(
  "/policy/:id/introduction",
  policyController.patchPolicyIntroduction
);

router.delete("/policy/delete/:id", policyController.deletePolicy);

module.exports = router;
