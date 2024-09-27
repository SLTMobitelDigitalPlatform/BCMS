const express = require("express");
const {
  getManpower,
  updateManpower,
} = require("../../../controllers/documentController/bcp/manpowerController");

const router = express.Router();

// Get manpower data by site
router.get("api/bcpManpower/:bcpid/:option", getManpower);

// Create or update manpower data
router.post("api/bcpManpower/:bcpid/:option", updateManpower);

module.exports = router;
