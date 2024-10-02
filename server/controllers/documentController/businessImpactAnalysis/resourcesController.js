const Resource = require("../../../models/documentModels/businessImpactAnalysis/resourcesModel");

// Create a new Resource
exports.createResource = async (req, res) => {
  try {
    const newResource = new Resource(req.body);
    await newResource.save();
    res.status(201).json(newResource);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Resources
exports.getAllResources = async (req, res) => {
  try {
    const resource = await Resource.find();
    res.status(200).json(resource);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get last Resource
exports.getLastResource = async (req, res) => {
  try {
    const lastResource = await Resource.findOne().sort({
      _id: -1,
    });

    res.status(200).json(lastResource);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Resources  by BIA ID
exports.getResourceByBIAID = async (req, res) => {
  const filter = { biaid: req.params.biaid };
  try {
    const resource = await Resource.find(filter);
    if (!resource) {
      return res.status(404).json({
        message: "Resource not found",
      });
    }
    res.status(200).json(resource);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single Resource by BIA ID and ID
exports.getResourceByIds = async (req, res) => {
  const { biaid, id } = req.params;
  try {
    const resource = await Resource.findOne({ _id: id, biaid });
    if (!resource) {
      return res.status(404).json({
        message: "Resource not found",
      });
    }
    res.status(200).json(resource);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a Resource
exports.updateResource = async (req, res) => {
  try {
    const updatedResource = await Resource.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedResource) {
      return res.status(404).json({
        message: "Resource not found",
      });
    }
    res.status(200).json(updatedResource);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a Resource
exports.deleteResource = async (req, res) => {
  try {
    const deletedResource = await Resource.findByIdAndDelete(
      req.params.id
    );
    if (!deletedResource) {
      return res.status(404).json({
        message: "Resource not found",
      });
    }
    res.status(200).json({
      message:
        "Resource deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
