const express = require("express");
const router = new express.Router();
const userControllers = require("../../controllers/userControllers/userController");
const authControllers = require("../../controllers/userControllers/authController");

// Routes
router.post("/user/register", userControllers.userRegister);
router.post("/user/sendotp", authControllers.userOtpSend);
router.post("/user/login", authControllers.userLogin);

router.get("/user/:id", userControllers.getUserById);
router.get(
  "/users",
  authControllers.protect,
  authControllers.restrict(
    "superadmin",
    "secretariatcoordinator ",
    "bcmteams ",
    "coordinators"
  ),
  userControllers.getusers
);

router.get(
  "/currentuser",
  authControllers.protect,
  userControllers.getLoggedInUser
);

router.put("/user/update/:id", userControllers.updateUser);
router.delete("/user/delete/:id", userControllers.deleteUser);

module.exports = router;
