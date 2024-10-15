const express = require("express");
const router = express.Router();
const riskElementController = require("../../../controllers/documentController/riskAssesment/riskElementController");
// const authControllers = require("../../controllers/userControllers/authController");

router.post(
  "/categories/add/:categoryName",
  riskElementController.addItemToCategory
);

router.post("/categories/create", riskElementController.createCategory);

router.get("/categories/:categoryName", riskElementController.getElements);
router.get("/categories", riskElementController.getAllCategories);

router.put(
  "/categories/:categoryName/edit/items/:itemId",
  riskElementController.editItemInCategory
);
router.put(
  "/categories/edit/:categoryId",
  riskElementController.editCategoryName
);

router.delete(
  "/categories/:categoryName/delete/items/:itemId",
  riskElementController.deleteItemInCategory
);
router.delete(
  "/categories/delete/:categoryId",
  riskElementController.deleteCategory
);

module.exports = router;
