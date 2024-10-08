const BiaDocumentControl = require("../../../models/documentModels/businessImpactAnalysis/BiaDocumentControlModel");

// Create a new Document Control
exports.createBiaDocumentControl = async (req, res) => {
  try {
    const newBiaDocumentControl = new BiaDocumentControl(req.body);
    await newBiaDocumentControl.save();
    res.status(201).json(newBiaDocumentControl);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Document Control
exports.getAllBiaDocumentControl = async (req, res) => {
  try {
    const BiaDocumentControl = await BiaDocumentControl.find();
    res.status(200).json(BiaDocumentControl);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get last Document control
exports.getLastBiaDocumentControl = async (req, res) => {
  try {
    const getLastBiaDocumentControl = await BiaDocumentControl.findOne().sort({
      _id: -1,
    });

    res.status(200).json(getLastBiaDocumentControl);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Document control  by BIA ID
exports.getBiaDocumentControlByBIAID = async (req, res) => {
  const filter = { biaid: req.params.biaid };
  try {
    const BiaDocumentControl = await BiaDocumentControl.find(filter);
    if (!BiaDocumentControl) {
      return res.status(404).json({
        message: "Document Control not found",
      });
    }
    res.status(200).json(BiaDocumentControl);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single Document control by BIA ID and ID
exports.getBiaDocumentControlByIds = async (req, res) => {
  const { biaid, id } = req.params;
  try {
    const BiaDocumentControl = await BiaDocumentControl.findOne({ _id: id, biaid });
    if (!BiaDocumentControl) {
      return res.status(404).json({
        message: "Document control not found",
      });
    }
    res.status(200).json(BiaDocumentControl);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a Document Control
exports.updateBiaDocumentControl = async (req, res) => {
  try {
    const updatedBiaDocumentControl = await BiaDocumentControl.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedBiaDocumentControl) {
      return res.status(404).json({
        message: "Document control not found",
      });
    }
    res.status(200).json(updatedBiaDocumentControl);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a Document control
exports.deleteBiaDocumentControl = async (req, res) => {
  try {
    const deletedBiaDocumentControl = await BiaDocumentControl.findByIdAndDelete(
      req.params.id
    );
    if (!deletedBiaDocumentControl) {
      return res.status(404).json({
        message: "Document control not found",
      });
    }
    res.status(200).json({
      message:
        "Document control deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
