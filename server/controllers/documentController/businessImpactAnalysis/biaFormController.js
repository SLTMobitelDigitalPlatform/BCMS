const BIAForm = require("../../../models/documentModels/businessImpactAnalysis/biaFormModel");

// Create a new bia form
exports.createBIAForm = async (req, res) => {
  try {
    const { biaid } = req.body;

    const existingBIA = await BIAForm.findOne({ biaid });
    if (existingBIA) {
      return res.status(400).json({ message: "BIA ID already exists" });
    }
    const newBIAForm = new BIAForm(req.body);
    await newBIAForm.save();
    res.status(201).json(newBIAForm);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all bia forms
exports.getBIAForms = async (req, res) => {
  try {
    const BIAForms = await BIAForm.find();
    res.status(200).json(BIAForms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get last bia form
exports.getLastbiaForm = async (req, res) => {
  try {
    const { template } = req.params;
    const lastBIAForm = await BIAForm.findOne({
      biaid: new RegExp(`^BIA-${template}-`),
    }).sort({ _id: -1 });

    res.status(200).json(lastBIAForm);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get bia form by BIA ID
exports.getbiaFormByBIAID = async (req, res) => {
  const filter = { biaid: req.params.biaid };
  try {
    const biaForm = await BIAForm.findOne(filter);
    if (!biaForm)
      return res.status(404).json({ message: "BIA Form not found" });
    res.status(200).json(biaForm);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single bia form by ID
exports.getbiaFormById = async (req, res) => {
  try {
    console.log("Requesting BIA Form with ID:", req.params.id);
    const singleBIAForm = await BIAForm.findById(req.params.id);
    if (!singleBIAForm) {
      console.log("BIA Form not found");
      return res.status(404).json({ message: "BIA Form not found" });
    }
    res.status(200).json(singleBIAForm);
  } catch (error) {
    console.error("Error fetching BIA form:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// Update a bia form by BIA ID
exports.updatebiaFormByBIAID = async (req, res) => {
  const { biaid } = req.body;
  const oldBIAID = req.params.biaid;

  try {
    if (biaid !== oldBIAID) {
      const existingBIA = await BIAForm.findOne({ biaid });
      if (existingBIA) {
        return res.status(400).json({
          message: "BIA ID already exists. Please choose a different ID.",
        });
      }
    }

    const updatedBIAForm = await BIAForm.findOneAndUpdate(
      { biaid: oldBIAID },
      req.body,
      { new: true }
    );

    if (!updatedBIAForm)
      return res.status(404).json({ message: "BIA Form not found" });

    if (biaid !== oldBIAID) {
      const documentModels = [
        
      ];

      await Promise.all(
        documentModels.map(async (Model) => {
          await Model.updateMany({ biaid: oldBIAID }, { $set: { biaid } });
        })
      );
    }
    res.status(200).json(updatedBIAForm);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a biaForm by ID
exports.updatebiaForm = async (req, res) => {
  try {
    const updatedBIAForm = await BIAForm.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedBIAForm)
      return res.status(404).json({ message: "BIA Form not found" });
    res.status(200).json(updatedBIAForm);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a biaForm by ID
exports.deletebiaForm = async (req, res) => {
  try {
    const deletedBIAForm = await BIAForm.findByIdAndDelete(req.params.id);
    if (!deletedBIAForm)
      return res.status(404).json({ message: "BIA Form not found" });
    res.status(200).json({ message: "BIA Form deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
