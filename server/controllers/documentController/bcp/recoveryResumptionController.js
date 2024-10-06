const RecoveryResumption = require("../../../models/documentModels/bcp/recoveryResumptionModel");

// Create a new Recovery Resumption
exports.createRecoveryResumption = async (req, res) => {
  try {
    const newRecoveryResumption = new RecoveryResumption(req.body);
    await newRecoveryResumption.save();
    res.status(201).json(newRecoveryResumption);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Recovery Resumptions by BCP ID
exports.getRecoveryResumptionsByBCPID = async (req, res) => {
  const { bcpid, cbfid } = req.params;
  const filter = { bcpid, cbfid };

  try {
    const recoveryResumptions = await RecoveryResumption.find(filter);
    if (!recoveryResumptions) {
      return res.status(404).json({ message: "Recovery Resumption not found" });
    }
    res.status(200).json(recoveryResumptions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single Recovery Resumption by BCP ID and MongoDB ID
exports.getRecoveryResumptionByIds = async (req, res) => {
  const { bcpid, cbfid, id } = req.params;
  try {
    const recoveryResumption = await RecoveryResumption.findOne({
      _id: id,
      bcpid,
      cbfid,
    });
    if (!recoveryResumption) {
      return res.status(404).json({ message: "Recovery Resumption not found" });
    }
    res.status(200).json(recoveryResumption);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a Recovery Resumption
exports.updateRecoveryResumption = async (req, res) => {
  try {
    const updatedRecoveryResumption =
      await RecoveryResumption.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
    if (!updatedRecoveryResumption) {
      return res.status(404).json({ message: "Recovery Resumption not found" });
    }
    res.status(200).json(updatedRecoveryResumption);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a Recovery Resumption
exports.deleteRecoveryResumption = async (req, res) => {
  try {
    const deletedRecoveryResumption =
      await RecoveryResumption.findByIdAndDelete(req.params.id);
    if (!deletedRecoveryResumption) {
      return res.status(404).json({ message: "Recovery Resumption not found" });
    }
    res
      .status(200)
      .json({ message: "Recovery Resumption deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
