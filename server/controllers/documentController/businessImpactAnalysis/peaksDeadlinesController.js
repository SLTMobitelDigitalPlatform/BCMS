const PeaksDeadline = require("../../../models/documentModels/businessImpactAnalysis/peaksDeadlinesModel");

// Create a new Peaks Deadline
exports.createPeaksDeadline = async (req, res) => {
  try {
    const newPeaksDeadline = new PeaksDeadline(req.body);
    await newPeaksDeadline.save();
    res.status(201).json(newPeaksDeadline);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Peaks Deadlines
exports.getAllPeaksDeadlines = async (req, res) => {
  try {
    const peaksDeadline = await PeaksDeadline.find();
    res.status(200).json(peaksDeadline);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get last Peaks Deadline
exports.getLastPeaksDeadline = async (req, res) => {
  try {
    const lastPeaksDeadline = await PeaksDeadline.findOne().sort({
      _id: -1,
    });

    res.status(200).json(lastPeaksDeadline);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Peaks Deadlines  by BIA ID
exports.getPeaksDeadlineByBIAID = async (req, res) => {
  const filter = { biaid: req.params.biaid };
  try {
    const peaksDeadline = await PeaksDeadline.find(filter);
    if (!peaksDeadline) {
      return res.status(404).json({
        message: "Peaks Deadline not found",
      });
    }
    res.status(200).json(peaksDeadline);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single Peaks Deadline by BIA ID and ID
exports.getPeaksDeadlineByIds = async (req, res) => {
  const { biaid, id } = req.params;
  try {
    const peaksDeadline = await PeaksDeadline.findOne({ _id: id, biaid });
    if (!peaksDeadline) {
      return res.status(404).json({
        message: "Peaks Deadline not found",
      });
    }
    res.status(200).json(peaksDeadline);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a Peaks Deadline
exports.updatePeaksDeadline = async (req, res) => {
  try {
    const updatedPeaksDeadline = await PeaksDeadline.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedPeaksDeadline) {
      return res.status(404).json({
        message: "Peaks Deadline not found",
      });
    }
    res.status(200).json(updatedPeaksDeadline);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a Peaks Deadline
exports.deletePeaksDeadline = async (req, res) => {
  try {
    const deletedPeaksDeadline = await PeaksDeadline.findByIdAndDelete(
      req.params.id
    );
    if (!deletedPeaksDeadline) {
      return res.status(404).json({
        message: "Peaks Deadline not found",
      });
    }
    res.status(200).json({
      message:
        "Peaks Deadline deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
