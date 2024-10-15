const AboutMe = require("../../models/meetingModels/AboutMeModel");
const multer = require("multer");
const path = require("path");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "../uploads");
    cb(null, uploadPath); // Ensure the directory path is correct
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Set the file name
  },
});

const upload = multer({ storage: storage }).single("image");

// Store AboutMe data
const createAboutMe = (req, res) => {
  upload(req, res, function (err) {
    if (err) {
      return res.status(400).json({ error: err });
    }

    const {
      name,
      serviceNo,
      about,
      country,
      address,
      email,
      contact,
      officialEmail,
      section,
    } = req.body;
    const image = req.file ? `uploads/${req.file.filename}` : null;

    const aboutMeInstance = new AboutMe({
      name,
      serviceNo,
      about,
      country,
      address,
      email,
      contact,
      image,
      officialEmail,
      section,
    });

    aboutMeInstance
      .save()
      .then(() => res.status(200).json("AboutMe added successfully"))
      .catch((err) => res.status(400).json({ error: err }));
  });
};

// Get AboutMe data
const getAboutMe = (req, res) => {
  AboutMe.findOne()
    .then((aboutMe) => res.status(200).json(aboutMe))
    .catch((err) => {
      res.status(400).json({ error: err });
    });
};

// Delete AboutMe data
const deleteAboutMe = (req, res) => {
  AboutMe.deleteOne()
    .then(() => res.status(200).json("AboutMe deleted successfully"))
    .catch((err) => res.status(400).json({ error: err }));
};

module.exports = {
  createAboutMe,
  getAboutMe,
  deleteAboutMe,
};
