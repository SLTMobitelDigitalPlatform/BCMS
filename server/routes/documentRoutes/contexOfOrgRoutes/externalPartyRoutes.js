const express = require("express");
const router = express.Router();
const externalPartyController = require("../../../controllers/documentController/contextOfOrganization/externalPartyController");
// const authControllers = require("../../controllers/userControllers/authController");

router.post(
  "/externalParty/create",
  externalPartyController.createExternalParty
);

router.get("/externalParty", externalPartyController.getExternalParty);

router.get("/externalParty/:id", externalPartyController.getExternalPartyById);

router.put(
  "/externalParty/edit/:id",
  externalPartyController.updateExternalParty
);

router.delete(
  "/externalParty/delete/:id",
  externalPartyController.deleteExternalParty
);

module.exports = router;
