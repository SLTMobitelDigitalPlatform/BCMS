const express = require("express");
const versionControlControllers = require("../../controllers/documentController/contextOfOrganization/versionControlController");
const authControllers = require("../../controllers/userControllers/authController");
const router = express.Router();

router.post(
  "/api/versionControls/add",
  versionControlControllers.createVersionControl
);
router.get(
  "/api/versionControls/",
  versionControlControllers.getVersionControls
);
router.get(
  "/api/versionControls/:id",
  versionControlControllers.getVersionById
);
router.put(
  "/api/versionControls/edit/:id",
  versionControlControllers.updateVersion
);
router.delete(
  "/api/versionControls/delete/:id",
  versionControlControllers.deleteVersion
);

module.exports = router;
