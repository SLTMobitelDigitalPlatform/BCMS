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

exports.getAllDocumentControls = async (req, res) => {
  try {
    const documentControls = await DocumentControl.find();
    res.status(200).json(documentControls);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a document control by BCP ID
exports.getDocumentControlByBCPID = async (req, res) => {
  const filter = { bcpid: req.params.bcpid };
  try {
    const documentControl = await DocumentControl.find(filter);
    if (!documentControl) {
      return res.status(404).json({ message: "Document Control not found" });
    }
    res.status(200).json(documentControl);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
