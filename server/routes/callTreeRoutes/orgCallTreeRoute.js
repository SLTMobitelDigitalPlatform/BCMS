const express = require("express");
const router = express.Router();
const orgCallTreeController = require("../../controllers/callTreeController/orgCallTreeController");
// const authControllers = require("../../controllers/userControllers/authController");

router.post("/callTreeOrg/create", orgCallTreeController.createOrgCallTreeNode);

router.get("/callTreeOrg", orgCallTreeController.getOrgCalltree);

router.put("/callTreeOrg/edit/:id", orgCallTreeController.editOrgCallTreeNode);

router.delete(
  "/callTreeOrg/delete/:id",
  orgCallTreeController.deleteOrgCallTreeNode
);

module.exports = router;
