const express = require("express");
const router = express.Router();
const proceduresAndProdessController = require("../../controllers/documentController/proceduresAndProdessController");
const authControllers = require("../../controllers/userControllers/authController");

router.post(
  "/proceduresAndProdess/create",
  proceduresAndProdessController.createProceduresAndProcess
);

router.get(
  "/proceduresAndProdess",
  proceduresAndProdessController.getProceduresAndProcess
);

router.get(
  "/proceduresAndProdess/:id",
  proceduresAndProdessController.getProceduresAndProcessById
);

router.put(
  "/proceduresAndProdess/edit/:id",
  proceduresAndProdessController.updateProceduresAndProcess
);

router.delete(
  "/proceduresAndProdess/delete/:id",
  proceduresAndProdessController.deleteProceduresAndProcess
);

module.exports = router;
