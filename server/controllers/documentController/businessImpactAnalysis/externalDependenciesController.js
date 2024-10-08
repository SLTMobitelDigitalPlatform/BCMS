const ExternalDependencies = require("../../../models/documentModels/businessImpactAnalysis/externalDependenciesModel");

// Create a new external dependency
exports.createExternalDependency = async (req, res) => {
  try {
    const newExternalDependency = new ExternalDependencies(req.body);
    await newExternalDependency.save();
    res.status(201).json(newExternalDependency);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all external dependencies by BIA ID
exports.getAllExternalDependenciesByBIAID = async (req, res) => {
  const filter = { biaid: req.params.biaid };
  try {
    const externalDependencies = await ExternalDependencies.find(filter);
    if (!externalDependencies) {
      return res
        .status(404)
        .json({ message: "External Dependencies not found" });
    }
    res.status(200).json(externalDependencies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single external dependency by BIA ID and MongoDB ID
exports.getExternalDependencyByIds = async (req, res) => {
  const { biaid, id } = req.params;
  try {
    const externalDependency = await ExternalDependencies.findOne({
      _id: id,
      biaid,
    });
    if (!externalDependency) {
      return res.status(404).json({ message: "External Dependency not found" });
    }
    res.status(200).json(externalDependency);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a external dependency
exports.updateExternalDependency = async (req, res) => {
  try {
    const updatedExternalDependency =
      await ExternalDependencies.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
    if (!updatedExternalDependency) {
      return res.status(404).json({ message: "External Dependency not found" });
    }
    res.status(200).json(updatedExternalDependency);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a external dependency
exports.deleteExternalDependency = async (req, res) => {
  try {
    const deletedExternalDependency =
      await ExternalDependencies.findByIdAndDelete(req.params.id);
    if (!deletedExternalDependency) {
      return res.status(404).json({ message: "External Dependency not found" });
    }
    res
      .status(200)
      .json({ message: "External Dependency deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
