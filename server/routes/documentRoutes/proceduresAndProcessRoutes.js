const express = require("express");
const router = express.Router();
const proceduresAndProdessController = require("../../controllers/documentController/contextOfOrganization/proceduresAndProdessController");
const authControllers = require("../../controllers/userControllers/authController");

router.post(
  "/proceduresAndProcess/create",
  proceduresAndProdessController.createProceduresAndProcess
);

router.get(
  "/proceduresAndProcess",
  proceduresAndProdessController.getProceduresAndProcess
);

router.get(
  "/proceduresAndProcess/:id",
  proceduresAndProdessController.getProceduresAndProcessById
);

router.get(
  "/proceduresAndProcesses/last",
  proceduresAndProdessController.getLastVersion
);

router.put(
  "/proceduresAndProcess/edit/:id",
  proceduresAndProdessController.updateProceduresAndProcess
);

router.delete(
  "/proceduresAndProcess/delete/:id",
  proceduresAndProdessController.deleteProceduresAndProcess
);

module.exports = router;
