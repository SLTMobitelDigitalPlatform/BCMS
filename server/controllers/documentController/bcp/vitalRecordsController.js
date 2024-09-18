const VitalRecords = require("../../../models/documentModels/bcp/vitalRecordsModel");

// Create a new vital records
exports.createVitalRecord = async (req, res) => {
  try {
    const newVitalRecord = new VitalRecords(req.body);
    await newVitalRecord.save();
    res.status(201).json(newVitalRecord);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all vital records
exports.getAllVitalRecords = async (req, res) => {
  try {
    const vitalRecords = await VitalRecords.find();
    res.status(200).json(vitalRecords);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get last vital records
exports.getLastVitalRecord = async (req, res) => {
  try {
    const lastVitalRecord = await VitalRecords.findOne().sort({
      _id: -1,
    });

    res.status(200).json(lastVitalRecord);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single vital records by ID
exports.getVitalRecordById = async (req, res) => {
  try {
    const vitalRecord = await VitalRecords.findById(req.params.id);
    if (!vitalRecord) {
      return res.status(404).json({ message: "Vital Records not found" });
    }
    res.status(200).json(vitalRecord);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a vital records
exports.updateVitalRecord = async (req, res) => {
  try {
    const updatedVitalRecord = await VitalRecords.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedVitalRecord) {
      return res.status(404).json({ message: "Vital Records not found" });
    }
    res.status(200).json(updatedVitalRecord);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a vital records
exports.deleteVitalRecord = async (req, res) => {
  try {
    const deletedVitalRecord = await VitalRecords.findByIdAndDelete(
      req.params.id
    );
    if (!deletedVitalRecord) {
      return res.status(404).json({ message: "Vital Records not found" });
    }
    res.status(200).json({ message: "Vital Records deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
