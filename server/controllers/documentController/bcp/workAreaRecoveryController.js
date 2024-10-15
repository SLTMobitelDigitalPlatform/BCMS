const WorkAreaRecovery = require("../../../models/documentModels/bcp/workAreaRecoveryModel");

// Create a new work area recovery
exports.createWorkAreaRecovery = async (req, res) => {
  try {
    const newWorkAreaRecovery = new WorkAreaRecovery(req.body);
    await newWorkAreaRecovery.save();
    res.status(201).json(newWorkAreaRecovery);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all work area recoveries by BCP ID
exports.getWorkAreaRecoveriesByBCPID = async (req, res) => {
  const filter = { bcpid: req.params.bcpid };
  try {
    const workAreaRecoveries = await WorkAreaRecovery.find(filter);
    if (!workAreaRecoveries) {
      return res
        .status(404)
        .json({ message: "Work Area Recoveries not found" });
    }
    res.status(200).json(workAreaRecoveries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single work area recovery by BCP ID and MongoDB ID
exports.getWorkAreaRecoveryByIds = async (req, res) => {
  const { bcpid, id } = req.params;
  try {
    const workAreaRecovery = await WorkAreaRecovery.findOne({ _id: id, bcpid });
    if (!workAreaRecovery) {
      return res.status(404).json({ message: "Work Area Recovery not found" });
    }
    res.status(200).json(workAreaRecovery);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a work area recovery
exports.updateWorkAreaRecovery = async (req, res) => {
  try {
    const updatedWorkAreaRecovery = await WorkAreaRecovery.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedWorkAreaRecovery) {
      return res.status(404).json({ message: "Work Area Recovery not found" });
    }
    res.status(200).json(updatedWorkAreaRecovery);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a work area recovery
exports.deleteWorkAreaRecovery = async (req, res) => {
  try {
    const deletedWorkAreaRecovery = await WorkAreaRecovery.findByIdAndDelete(
      req.params.id
    );
    if (!deletedWorkAreaRecovery) {
      return res.status(404).json({ message: "Work Area Recovery not found" });
    }
    res
      .status(200)
      .json({ message: "Work Area Recovery deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
