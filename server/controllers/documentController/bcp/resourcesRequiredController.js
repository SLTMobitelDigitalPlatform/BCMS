const ResourcesRequired = require("../../../models/documentModels/bcp/resourcesRequiredModel");

// Create a new resources required
exports.createResourcesRequired = async (req, res) => {
  try {
    const newResourcesRequired = new ResourcesRequired(req.body);
    await newResourcesRequired.save();
    res.status(201).json(newResourcesRequired);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all resources required
exports.getAllResourcesRequired = async (req, res) => {
  try {
    const resourcesRequired = await ResourcesRequired.find();
    res.status(200).json(resourcesRequired);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get last resources required
exports.getLastResourcesRequired = async (req, res) => {
  try {
    const lastResourcesRequired = await ResourcesRequired.findOne().sort({
      _id: -1,
    });

    res.status(200).json(lastResourcesRequired);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single resources required by ID
exports.getResourcesRequiredById = async (req, res) => {
  try {
    const resourcesRequired = await ResourcesRequired.findById(req.params.id);
    if (!resourcesRequired) {
      return res.status(404).json({ message: "Resources Required not found" });
    }
    res.status(200).json(resourcesRequired);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a resources required
exports.updateResourcesRequired = async (req, res) => {
  try {
    const updatedResourcesRequired = await ResourcesRequired.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedResourcesRequired) {
      return res.status(404).json({ message: "Resources Required not found" });
    }
    res.status(200).json(updatedResourcesRequired);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a resources required
exports.deleteResourcesRequired = async (req, res) => {
  try {
    const deletedResourcesRequired = await ResourcesRequired.findByIdAndDelete(
      req.params.id
    );
    if (!deletedResourcesRequired) {
      return res.status(404).json({ message: "Resources Required not found" });
    }
    res.status(200).json(deletedResourcesRequired);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
