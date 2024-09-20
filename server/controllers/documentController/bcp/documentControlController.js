const DocumentControl = require("../../../models/documentModels/bcp/documentControlModel");

// Create a new document control
exports.createDocumentControl = async (req, res) => {
  try {
    const newDocumentControl = new DocumentControl(req.body);
    await newDocumentControl.save();
    res.status(201).json(newDocumentControl);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all document controls
exports.getAllDocumentControls = async (req, res) => {
  try {
    const documentControls = await DocumentControl.find();
    res.status(200).json(documentControls);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all document controls by BCP ID
exports.getDocumentControlByBCPID = async (req, res) => {
  const filter = { bcpid: req.params.bcpid };
  try {
    const documentControls = await DocumentControl.find(filter);
    if (!documentControls) {
      return res.status(404).json({ message: "Document Control not found" });
    }
    res.status(200).json(documentControls);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single document control by BCP ID and MongoDB ID
exports.getDocumentControlByIds = async (req, res) => {
  const { bcpid, id } = req.params;
  try {
    const documentControl = await DocumentControl.findOne({ _id: id, bcpid });
    if (!documentControl) {
      return res.status(404).json({ message: "Document Control not found" });
    }
    res.status(200).json(documentControl);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a document control
exports.updateDocumentControl = async (req, res) => {
  try {
    const updatedDocumentControl = await DocumentControl.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedDocumentControl) {
      return res.status(404).json({ message: "Document Control not found" });
    }
    res.status(200).json(updatedDocumentControl);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a document control
exports.deleteDocumentControl = async (req, res) => {
  try {
    const deletedDocumentControl = await DocumentControl.findByIdAndDelete(
      req.params.id
    );
    if (!deletedDocumentControl) {
      return res.status(404).json({ message: "Document Control not found" });
    }
    res.status(200).json({ message: "Document Control deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
