const VersionControlRisk = require("../../../models/documentModels/versionControlRiskAssModel");
const User = require("../../../models/userModels/user");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sltmobitelbcmssystem@gmail.com",
    pass: "lvbr ypwc atoa qcfi",
  },
});

// Create a new version control
const createVersionControl = async (req, res) => {
  try {
    const versionControl = new VersionControlRisk(req.body);
    await versionControl.save();
    res.status(201).json(versionControl);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all version control
const getVersionControls = async (req, res) => {
  try {
    const versionControl = await VersionControlRisk.find()
      .populate("prepare")
      .populate("checkedBy")
      .populate("approve");
    res.status(200).json(versionControl);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single version control by ID
const getVersionById = async (req, res) => {
  try {
    const versionControl = await VersionControlRisk.findById(req.params.id);
    if (!versionControl)
      return res.status(404).json({ message: "VersionControl not found" });
    res.status(200).json(versionControl);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a versionControl by ID
const updateVersion = async (req, res) => {
  try {
    const { isChecked, checkedBy, approve, prepare } = req.body;
    const versionControl = await VersionControlRisk.findByIdAndUpdate(
      req.params.id,
      { isChecked, checkedBy, approve, prepare },
      { new: true }
    );

    if (!versionControl)
      return res.status(404).json({ message: "versionControl not found" });

    // Send the response once and only once
    res.status(200).json(versionControl);

    // If 'isChecked' is "Not Approved", send the email asynchronously after sending the response
    if (isChecked === "Not Approved") {
      const checkedByDetails = await User.find({
        _id: { $in: prepare },
      }).select("email name");

      const checkedByEmails = checkedByDetails.map((user) => user.email);
      const checkedByNames = checkedByDetails.map((user) => user.name).join(", ");

      const mailOptions = {
        from: "sltmobitelbcmssystem@gmail.com",
        to: checkedByEmails,
        subject: "Version Control",
        text: `Dear ${checkedByNames},\n\nThe details of the event have been updated:\n
             Title: Risk Management\n
             Checking Status: ${isChecked}\n\n
             Note: This is an auto-generated email. Please do not reply to this email.`,
      };
      // Send the email but do not await it, so it doesn't block or potentially cause another response
      transporter.sendMail(mailOptions)
        .then(info => console.log("Email sent to:", checkedByEmails.join(", "), info.response))
        .catch(error => console.log("Error sending email:", error));
    }
      if (isChecked === "Checked") {
        const aprovedByDetails = await User.find({
          _id: { $in: approve },
        }).select("email name");
  
        const approvedByEmails = aprovedByDetails.map((user) => user.email);
        const approvedByNames = aprovedByDetails.map((user) => user.name).join(", ");
  
        const mailOptions = {
          from: "sltmobitelbcmssystem@gmail.com",
          to: approvedByEmails,
          subject: "Version Control",
          text: `Dear ${approvedByNames},\n\nThe details of the event have been updated:\n
               Title: Risk Management\n
               Checking Status: ${isChecked}\n\n
               Note: This is an auto-generated email. Please do not reply to this email.`,
        };
  
          // Send the email but do not await it, so it doesn't block or potentially cause another response
      transporter.sendMail(mailOptions)
      .then(info => console.log("Email sent to:", approvedByEmails.join(", "), info.response))
      .catch(error => console.log("Error sending email:", error));
      };

      if (isChecked === "Checked" && approve==="Not Approved") {
        const aprovedByDetails = await User.find({
          _id: { $in: isChecked },
        }).select("email name");
  
        const approvedByEmails = aprovedByDetails.map((user) => user.email);
        const approvedByNames = aprovedByDetails.map((user) => user.name).join(", ");
  
        const mailOptions = {
          from: "sltmobitelbcmssystem@gmail.com",
          to: approvedByEmails,
          subject: "Version Control",
          text: `Dear ${approvedByNames},\n\nThe details of the event have been updated:\n
               Title: Risk Management\n
               Checking Status: ${isChecked}\n\n
               Note: This is an auto-generated email. Please do not reply to this email.`,
        };
  
       // Send the email but do not await it, so it doesn't block or potentially cause another response
       transporter.sendMail(mailOptions)
       .then(info => console.log("Email sent to:", approvedByEmails.join(", "), info.response))
       .catch(error => console.log("Error sending email:", error));
      };

    
  } catch (error) {
    // If an error occurs before sending a response, catch it here and send a response
    if (!res.headersSent) {
      res.status(400).json({ message: error.message });
    } else {
      console.error("Error occurred:", error.message);
    }

    
  }
};
// Delete a versionControl by ID
const deleteVersion = async (req, res) => {
  try {
    const versionControl = await VersionControlRisk.findByIdAndDelete(
      req.params.id
    );
    if (!versionControl)
      return res.status(404).json({ message: "versionControl not found" });
    res.status(200).json({ message: "versionControl deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getLastVersion = async (req, res) => {
  try {
    const lastVersion = await VersionControlRisk.findOne().sort({ _id: -1 });

    res.status(200).json(lastVersion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createVersionControl,
  getVersionControls,
  getVersionById,
  updateVersion,
  deleteVersion,
  getLastVersion,
};
