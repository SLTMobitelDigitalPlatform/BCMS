const RecoveryStrategy = require("../../../models/documentModels/bcp/recoveryStrategyModel");

// Create a new Recovery Strategy
exports.createRecoveryStrategy = async (req, res) => {
  try {
    const newRecoveryStrategy = new RecoveryStrategy(req.body);
    await newRecoveryStrategy.save();
    res.status(201).json(newRecoveryStrategy);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Recovery Strategies by BCP ID
exports.getRecoveryStrategiesByBCPID = async (req, res) => {
  const filter = { bcpid: req.params.bcpid };
  try {
    const recoveryStrategies = await RecoveryStrategy.find(filter);
    if (!recoveryStrategies) {
      return res.status(404).json({ message: "Recovery Strategy not found" });
    }
    res.status(200).json(recoveryStrategies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single Recovery Strategy by BCP ID and MongoDB ID
exports.getRecoveryStrategyByIds = async (req, res) => {
  const { bcpid, id } = req.params;
  try {
    const recoveryStrategy = await RecoveryStrategy.findOne({ _id: id, bcpid });
    if (!recoveryStrategy) {
      return res.status(404).json({ message: "Recovery Strategy not found" });
    }
    res.status(200).json(recoveryStrategy);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a Recovery Strategy
exports.updateRecoveryStrategy = async (req, res) => {
  try {
    const updatedRecoveryStrategy = await RecoveryStrategy.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedRecoveryStrategy) {
      return res.status(404).json({ message: "Recovery Strategy not found" });
    }
    res.status(200).json(updatedRecoveryStrategy);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a Recovery Strategy
exports.deleteRecoveryStrategy = async (req, res) => {
  try {
    const deletedRecoveryStrategy = await RecoveryStrategy.findByIdAndDelete(
      req.params.id
    );
    if (!deletedRecoveryStrategy) {
      return res.status(404).json({ message: "Recovery Strategy not found" });
    }
    res.status(200).json({ message: "Recovery Strategy deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
