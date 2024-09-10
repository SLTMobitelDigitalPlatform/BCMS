const express = require("express");
const router = express.Router();
const callTreeController = require("../../controllers/callTreeController/callTreeController");
// const authControllers = require("../../controllers/userControllers/authController");

router.post("/callTree/create", callTreeController.createCallTreeNode);

router.get("/callTree", callTreeController.getCallTreee);

// router.get("/callTree/:id", externalIssueController.getExternalIssueById);

router.put("/callTree/edit/:id", callTreeController.editCallTreeNode);

router.delete("/callTree/delete/:id", callTreeController.deleteCallTreeNode);

module.exports = router;
