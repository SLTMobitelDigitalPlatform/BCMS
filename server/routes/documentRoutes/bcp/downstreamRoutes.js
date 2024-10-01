const express = require("express");

const {
  createDownstream,
  getDownstreamsByBCPID,
  getDownstreamByIds,
  updateDownstream,
  deleteDownstream,
} = require("../../../controllers/documentController/bcp/downstreamController");

const router = express.Router();

router.post("/api/bcpDownstream/add", createDownstream);

router.get("/api/bcpDownstream/:bcpid", getDownstreamsByBCPID);

router.get("/api/bcpDownstream/:bcpid/:id", getDownstreamByIds);

router.put("/api/bcpDownstream/edit/:id", updateDownstream);

router.delete("/api/bcpDownstream/delete/:id", deleteDownstream);

module.exports = router;
