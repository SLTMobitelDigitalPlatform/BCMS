const express = require("express");
const {
  createVersionControl,
  getVersionControls,
  getVersionById,
  updateVersion,
  deleteVersion,
} = require("../controllers/versionControlController");
const router = express.Router();

router.post("/add", createVersionControl);
router.get("/", getVersionControls);
router.get("/:id", getVersionById);
router.put("/edit/:id", updateVersion);
router.delete("/delete/:id", deleteVersion);

module.exports = router;
