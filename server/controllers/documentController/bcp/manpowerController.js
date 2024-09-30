const Manpower = require("../../../models/documentModels/bcp/manpowerModel");

// Get manpower data by site
exports.getManpower = async (req, res) => {
  try {
    const { bcpid, option } = req.params;
    const manpower = await Manpower.findOne({ bcpid, option });

    if (!manpower) {
      return res.status(200).json({
        message: "No manpower data found for this BCP.",
        tableData: {},
      });
    }

    res.json(manpower);
  } catch (err) {
    res.status(500).json({ message: "Error fetching manpower data" });
  }
};

// Update manpower data
exports.updateManpower = async (req, res) => {
  const { bcpid, option } = req.params;
  const { tableData } = req.body;

  try {
    let manpower = await Manpower.findOne({ bcpid, option });
    if (!manpower) {
      manpower = new Manpower({ bcpid, option, tableData });
    } else {
      manpower.tableData = tableData;
    }

    await manpower.save();
    res.json(manpower);
  } catch (err) {
    res.status(500).json({ message: "Error updating manpower data" });
  }
};
