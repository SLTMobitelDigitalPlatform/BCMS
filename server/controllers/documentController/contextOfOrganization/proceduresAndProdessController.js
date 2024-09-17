const ProceduresAndProcess = require("../../../models/documentModels/proceduresAndProcess");

const getProceduresAndProcess = async (req, res) => {
  try {
    const proceduresAndProcess = await ProceduresAndProcess.find();
    if (!proceduresAndProcess) {
      return res
        .status(404)
        .json({ message: "Procedures And Process not found" });
    }
    res.status(200).json(proceduresAndProcess);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProceduresAndProcessById = async (req, res) => {
  try {
    const { id } = req.params;
    const proceduresAndProcessById = await ProceduresAndProcess.findById(id);
    if (!proceduresAndProcessById) {
      return res
        .status(404)
        .json({ message: "Procedures And Process  not found" });
    }
    res.status(200).json(proceduresAndProcessById);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProceduresAndProcess = async (req, res) => {
  try {
    const proceduresAndProcessToCreate = new ProceduresAndProcess(req.body);
    await proceduresAndProcessToCreate.save();
    res.status(200).json(proceduresAndProcessToCreate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProceduresAndProcess = async (req, res) => {
  try {
    const { id } = req.params;
    const proceduresAndProcessToUpdate =
      await ProceduresAndProcess.findByIdAndUpdate(id, req.body, {
        new: true,
      });
    if (!proceduresAndProcessToUpdate) {
      return res
        .status(404)
        .json({ message: "Procedures And Process not found" });
    }
    res.status(200).json(proceduresAndProcessToUpdate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProceduresAndProcess = async (req, res) => {
  try {
    const { id } = req.params;
    const proceduresAndProcessToDelete =
      await ProceduresAndProcess.findByIdAndDelete(id);
    if (!proceduresAndProcessToDelete) {
      return res
        .status(404)
        .json({ message: "Procedures And Process not found" });
    }
    res
      .status(200)
      .json({ message: "Procedures And Process Deleted Successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getLastVersion = async (req, res) => {
  try {
    const lastVersion = await ProceduresAndProcess.findOne().sort({ _id: -1 });

    res.status(200).json(lastVersion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProceduresAndProcess,
  getProceduresAndProcessById,
  createProceduresAndProcess,
  updateProceduresAndProcess,
  deleteProceduresAndProcess,
  getLastVersion,
};
