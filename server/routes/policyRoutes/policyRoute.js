const express = require("express");
const router = express.Router();
const policyController = require("../../controllers/policyController/policyController");
// const authControllers = require("../../controllers/userControllers/authController");

router.post("/policy/create", policyController.createPolicy);

router.get("/policies", policyController.getAllPolicies);

router.get("/policy/:id", policyController.getPolicyById);

router.get("/policy/last", policyController.getLastPolicy);

router.put("/policy/edit/:id", policyController.editPolicy);

router.delete("/policy/delete/:id", policyController.deletePolicy);

module.exports = router;
