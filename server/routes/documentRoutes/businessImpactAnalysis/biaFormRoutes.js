const express = require("express");
const biaFormControllers = require("../../controllers/documentController/bia/biaFormController");
const router = express.Router();

router.post(
  "/api/biaForms/add",
  biaFormControllers.createBiaForm
);
router.get(
  "/api/biaForms/last",
  biaFormControllers.getLastBiaForm
);
router.get(
  "/api/biaForms/",
  biaFormControllers.getBiaForms
);
router.get(
  "/api/biaForms/:id",
  biaFormControllers.getBiaFormById
);

router.put(
  "/api/biaForms/edit/:id",
  biaFormControllers.updateBiaForm
);
router.delete(
  "/api/biaForms/delete/:id",
  biaFormControllers.deleteBiaForm
);

module.exports = router;
