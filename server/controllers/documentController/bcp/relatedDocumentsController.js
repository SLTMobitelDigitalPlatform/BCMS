const RelatedDocuments = require("../../../models/documentModels/bcp/relatedDocumentsModel");

// Create a new related document
exports.createRelatedDocument = async (req, res) => {
  try {
    const newRelatedDocument = new RelatedDocuments(req.body);
    await newRelatedDocument.save();
    res.status(201).json(newRelatedDocument);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all related documents by BCP ID
exports.getRelatedDocumentsByBCPID = async (req, res) => {
  const filter = { bcpid: req.params.bcpid };
  try {
    const relatedDocuments = await RelatedDocuments.find(filter);
    if (!relatedDocuments) {
      return res.status(404).json({ message: "Related Documents not found" });
    }
    res.status(200).json(relatedDocuments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single related document by BCP ID and MongoDB ID
exports.getRelatedDocumentByIds = async (req, res) => {
  const { bcpid, id } = req.params;
  try {
    const relatedDocument = await RelatedDocuments.findOne({ _id: id, bcpid });
    if (!relatedDocument) {
      return res.status(404).json({ message: "Related Document not found" });
    }
    res.status(200).json(relatedDocument);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a related document
exports.updateRelatedDocument = async (req, res) => {
  try {
    const updatedRelatedDocument = await RelatedDocuments.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedRelatedDocument) {
      return res.status(404).json({ message: "Related Document not found" });
    }
    res.status(200).json(updatedRelatedDocument);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a related document
exports.deleteRelatedDocument = async (req, res) => {
  try {
    const deletedRelatedDocument = await RelatedDocuments.findByIdAndDelete(
      req.params.id
    );
    if (!deletedRelatedDocument) {
      return res.status(404).json({ message: "Related Document not found" });
    }
    res.status(200).json({ message: "Related Document deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
