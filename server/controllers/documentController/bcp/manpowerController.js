const Manpower = require("../../../models/documentModels/bcp/manpowerModel");

// Get manpower data by site
exports.getManpower = async (req, res) => {
  try {
    const { bcpid, option } = req.params;
    const manpower = await Manpower.findOne({ bcpid, option });

    if (!manpower) {
      return res.status(404).json({ message: "Manpower data not found" });
    }

    res.json(manpower);
  } catch (err) {
    res.status(500).json({ message: "Error fetching manpower data" });
  }
};

// Update manpower data
exports.updateManpower = async (req, res) => {
  try {
    const { bcpid, option } = req.params;
    const { tableData } = req.body;

    const manpower = await Manpower.findOneAndUpdate(
      { bcpid, option },
      { tableData },
      { new: true, upsert: true }
    );

    res.json(manpower);
  } catch (err) {
    res.status(500).json({ message: "Error updating manpower data" });
  }
};
