const express = require("express");
const router = express.Router();
const interfaceDependanciesController = require("../../controllers/documentController/interfaceDependanciesController");
const authControllers = require("../../controllers/userControllers/authController");

router.post(
  "/interfaceDependancy/create",
  interfaceDependanciesController.createInterfaceDependancy
);

router.get(
  "/interfaceDependancies",
  interfaceDependanciesController.getInterfaceDependacy
);

router.get(
  "/interfaceDependancy/:id",
  interfaceDependanciesController.getInterfaceDependancyById
);

router.put(
  "/interfaceDependancy/edit/:id",
  interfaceDependanciesController.updateInterfaceDependancy
);

router.delete(
  "/interfaceDependancy/delete/:id",
  interfaceDependanciesController.deleteInterfaceDependancy
);

module.exports = router;
