const Downstream = require("../../../models/documentModels/bcp/downStreamModel");

// Create a new Downstream
exports.createDownstream = async (req, res) => {
  const downstream = new Downstream(req.body);
  try {
    const newDownstream = await downstream.save();
    res.status(201).json(newDownstream);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all downstreams by BCP ID
exports.getDownstreamsByBCPID = async (req, res) => {
  const { bcpid } = req.params;
  const { criticalBusinessFunction } = req.query;

  const filter = { bcpid };
  if (criticalBusinessFunction) {
    filter.criticalBusinessFunction = criticalBusinessFunction;
  }
  try {
    const downstreams = await Downstream.find(filter);
    if (!downstreams) {
      return res.status(404).json({ message: "Downstreams not found" });
    }
    res.status(200).json(downstreams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single downstream by BCP ID and Mongo ID
exports.getDownstreamByIds = async (req, res) => {
  const { bcpid, id } = req.params;
  try {
    const downstream = await Downstream.findOne({ _id: id, bcpid });
    if (!downstream) {
      return res.status(404).json({ message: "Downstream not found" });
    }
    res.status(200).json(downstream);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Update a downstream
exports.updateDownstream = async (req, res) => {
  try {
    const updatedDownstream = await Downstream.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedDownstream) {
      return res.status(404).json({ message: "Downstream not found" });
    }
    res.status(200).json(updatedDownstream);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a downstream
exports.deleteDownstream = async (req, res) => {
  try {
    const deletedDownstream = await Downstream.findByIdAndDelete(req.params.id);
    if (!deletedDownstream) {
      return res.status(404).json({ message: "Downstream not found" });
    }
    res.status(200).json({ message: "Downstream deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
