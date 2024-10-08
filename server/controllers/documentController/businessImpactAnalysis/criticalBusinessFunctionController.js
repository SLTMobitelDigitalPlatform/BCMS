const CriticalBusinessFunction = require("../../../models/documentModels/businessImpactAnalysis/criticalBusinessFunctionModel");

// Create a new critical business function
exports.createCriticalBusinessFunction = async (req, res) => {
  try {
    const newCriticalBusinessFunction = new CriticalBusinessFunction(req.body);
    await newCriticalBusinessFunction.save();
    res.status(201).json(newCriticalBusinessFunction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all critical business functions by BIA ID
exports.getCriticalBusinessFunctionsByBIAID = async (req, res) => {
  const filter = { biaid: req.params.biaid };
  try {
    const criticalBusinessFunctions = await CriticalBusinessFunction.find(
      filter
    );
    if (!criticalBusinessFunctions) {
      return res
        .status(404)
        .json({ message: "Critical Business Functions not found" });
    }
    res.status(200).json(criticalBusinessFunctions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single critical business function by BIA ID and MongoDB ID
exports.getCriticalBusinessFunctionByIds = async (req, res) => {
  const { biaid, id } = req.params;
  try {
    const criticalBusinessFunction = await CriticalBusinessFunction.findOne({
      _id: id,
      biaid,
    });
    if (!criticalBusinessFunction) {
      return res
        .status(404)
        .json({ message: "Critical Business Function not found" });
    }
    res.status(200).json(criticalBusinessFunction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a critical business function
exports.updateCriticalBusinessFunction = async (req, res) => {
  try {
    const updatedCriticalBusinessFunction =
      await CriticalBusinessFunction.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
    if (!updatedCriticalBusinessFunction) {
      return res
        .status(404)
        .json({ message: "Critical Business Function not found" });
    }
    res.status(200).json(updatedCriticalBusinessFunction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a critical business function
exports.deleteCriticalBusinessFunction = async (req, res) => {
  try {
    const deletedCriticalBusinessFunction =
      await CriticalBusinessFunction.findByIdAndDelete(req.params.id);
    if (!deletedCriticalBusinessFunction) {
      return res
        .status(404)
        .json({ message: "Critical Business Function not found" });
    }
    res
      .status(200)
      .json({ message: "Critical Business Function deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
