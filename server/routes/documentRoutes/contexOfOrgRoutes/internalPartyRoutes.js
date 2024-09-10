const express = require("express");
const router = express.Router();
const internalPartyController = require("../../../controllers/documentController/contextOfOrganization/internalPartyController");
// const authControllers = require("../../controllers/userControllers/authController");

router.post(
  "/internalParty/create",
  internalPartyController.createInternalParty
);

router.get("/internalParty", internalPartyController.getInternalParty);

router.get("/internalParty/:id", internalPartyController.getInternalPartyById);

router.put(
  "/internalParty/edit/:id",
  internalPartyController.updateInternalParty
);

router.delete(
  "/internalParty/delete/:id",
  internalPartyController.deleteInternalParty
);

module.exports = router;
