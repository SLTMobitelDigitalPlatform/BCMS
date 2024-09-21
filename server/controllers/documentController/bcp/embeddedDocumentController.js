const EmbeddedDocument = require("../../../models/documentModels/bcp/embeddedDocumentModel");

// Create a new embedded document
exports.createEmbeddedDocument = async (req, res) => {
  try {
    const newEmbeddedDocument = new EmbeddedDocument(req.body);
    await newEmbeddedDocument.save();
    res.status(201).json(newEmbeddedDocument);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all embedded documents
exports.getAllEmbeddedDocuments = async (req, res) => {
  try {
    const embeddedDocuments = await EmbeddedDocument.find();
    res.status(200).json(embeddedDocuments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all embedded documents by BCP ID
exports.getEmbeddedDocumentsByBCPID = async (req, res) => {
  const filter = { bcpid: req.params.bcpid };
  try {
    const embeddedDocuments = await EmbeddedDocument.find(filter);
    if (!embeddedDocuments) {
      return res.status(404).json({ message: "Embedded Documents not found" });
    }
    res.status(200).json(embeddedDocuments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get last embedded document
exports.getLastEmbeddedDocument = async (req, res) => {
  try {
    const lastEmbeddedDocument = await EmbeddedDocument.findOne().sort({
      _id: -1,
    });

    res.status(200).json(lastEmbeddedDocument);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single embedded document by BCP ID and MongoDB ID
exports.getEmbeddedDocumentByIds = async (req, res) => {
  const { bcpid, id } = req.params;
  try {
    const embeddedDocument = await EmbeddedDocument.findOne({ _id: id, bcpid });
    if (!embeddedDocument) {
      return res.status(404).json({ message: "Embedded Document not found" });
    }
    res.status(200).json(embeddedDocument);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an embedded document
exports.updateEmbeddedDocument = async (req, res) => {
  try {
    const updatedEmbeddedDocument = await EmbeddedDocument.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedEmbeddedDocument) {
      return res.status(404).json({ message: "Embedded Document not found" });
    }
    res.status(200).json(updatedEmbeddedDocument);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an embedded document
exports.deleteEmbeddedDocument = async (req, res) => {
  try {
    const deletedEmbeddedDocument = await EmbeddedDocument.findByIdAndDelete(
      req.params.id
    );
    if (!deletedEmbeddedDocument) {
      return res.status(404).json({ message: "Embedded Document not found" });
    }
    res.status(200).json({ message: "Embedded Document deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
