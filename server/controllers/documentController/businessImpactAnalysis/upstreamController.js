const Upstream = require("../../../models/documentModels/businessImpactAnalysis/upstreamModel");

// Create a new upstream
exports.createUpstream = async (req, res) => {
  try {
    const newUpstream = new Upstream(req.body);
    await newUpstream.save();
    res.status(201).json(newUpstream);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all upstreams by BIA ID
exports.getUpstreamsByBIAID = async (req, res) => {
  const { biaid } = req.params;
  const { criticalBusinessFunction } = req.query;

  const filter = { biaid };
  if (criticalBusinessFunction) {
    filter.criticalBusinessFunction = criticalBusinessFunction;
  }
  try {
    const upstreams = await Upstream.find(filter);
    if (!upstreams) {
      return res.status(404).json({ message: "Upstreams not found" });
    }
    res.status(200).json(upstreams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single upstream by BIA ID and Mongo ID
exports.getUpstreamByIds = async (req, res) => {
  const { biaid, id } = req.params;
  try {
    const upstream = await Upstream.findOne({ _id: id, biaid });
    if (!upstream) {
      return res.status(404).json({ message: "Upstream not found" });
    }
    res.status(200).json(upstream);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an upstream
exports.updateUpstream = async (req, res) => {
  try {
    const updatedUpstream = await Upstream.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedUpstream) {
      return res.status(404).json({ message: "Upstream not found" });
    }
    res.status(200).json(updatedUpstream);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an upstream
exports.deleteUpstream = async (req, res) => {
  try {
    const deletedUpstream = await Upstream.findByIdAndDelete(req.params.id);
    if (!deletedUpstream) {
      return res.status(404).json({ message: "Upstream not found" });
    }
    res.status(200).json({ message: "Upstream deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
