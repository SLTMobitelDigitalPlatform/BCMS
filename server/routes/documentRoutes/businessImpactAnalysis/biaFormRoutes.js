const express = require("express");
const biaFormControllers = require("../../controllers/documentController/bia/biaFormController");
const router = express.Router();

router.post(
  "/api/biaForms/add",
  biaFormControllers.createVersionControl
);
router.get(
  "/api/biaForms/last",
  biaFormControllers.getLastVersion
);
router.get(
  "/api/biaForms/",
  biaFormControllers.getVersionControls
);
router.get(
  "/api/biaForms/:id",
  biaFormControllers.getVersionById
);

router.put(
  "/api/biaForms/edit/:id",
  biaFormControllers.updateVersion
);
router.delete(
  "/api/biaForms/delete/:id",
  biaFormControllers.deleteVersion
);

module.exports = router;
