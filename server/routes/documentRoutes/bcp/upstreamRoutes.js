const express = require("express");

const {
  createUpstream,
  getUpstreamsByBCPID,
  getUpstreamByIds,
  updateUpstream,
  deleteUpstream,
} = require("../../../controllers/documentController/bcp/upstreamController");

const router = express.Router();

router.post("/api/bcpUpstream/add", createUpstream);

router.get("/api/bcpUpstream/:bcpid", getUpstreamsByBCPID);

router.get("/api/bcpUpstream/:bcpid/:id", getUpstreamByIds);

router.put("/api/bcpUpstream/edit/:id", updateUpstream);

router.delete("/api/bcpUpstream/delete/:id", deleteUpstream);

module.exports = router;
