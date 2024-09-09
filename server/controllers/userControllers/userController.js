const User = require("../../models/userModels/user");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

exports.getusers = async (req, res) => {
  try {
    const userData = await User.find().populate("section", "name");

    if (!userData || userData.length === 0) {
      return res.status(404).json({ message: "User data not found!" });
    }

    res.status(200).json(userData);
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).populate("section", "name");

    if (!user) {
      return res.status(404).json({ message: "User data not found!" });
    }
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
};

exports.userRegister = async (req, res) => {
  const {
    name,
    email,
    designation,
    section,
    serviceNumber,
    contactNumber,
    role,
    callTree,
  } = req.body;

  try {
    if (!name || !email || !contactNumber) {
      res.status(400).json({ error: "Please Enter All Input Data" });
    }

    const presuer = await User.findOne({ email: email });

    if (presuer) {
      res.status(400).json({ error: "This User Allready exist in our db" });
    } else {
      const userregister = new User({
        name,
        email,
        serviceNumber,
        designation,
        section,
        contactNumber,
        role,
        callTree,
      });

      // here password hasing

      const storeData = await userregister.save();
      res.status(200).json(storeData);
    }
  } catch (error) {
    res.status(400).json({ error: "Invalid Details", error });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const userExist = await User.findById(userId);
    if (!userExist) {
      return res.status(404).json({ message: "User not found!" });
    }
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Invalid Details", error });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const userExist = await User.findById(userId);
    if (!userExist) {
      return res.status(404).json({ message: "User not found!" });
    }
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: "User Deleted Successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Something Went Wrong", error });
  }
};

exports.getLoggedInUser = async (req, res) => {
  try {
    // req.user is set by the protect middleware

    const user = await User.findById(req.user._id).populate(
      "section",
      "name sectionCode"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "../../userImages");
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

// Filter to accept only image files
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const mimeType = allowedTypes.test(file.mimetype);
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  if (mimeType && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
};

// Initialize multer with storage configuration and file filter
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB
}).single("profileImg"); // Single image upload under 'profileImg' field

// Controller to handle profile image upload
exports.uploadProfileImage = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Please upload an image file" });
    }

    try {
      const userId = req.params.id;
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found!" });
      }

      // Delete the old profile image if it exists
      if (user.profileImg) {
        const oldImagePath = path.join(
          __dirname,
          "../../userImages",
          path.basename(user.profileImg)
        );
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      // Update user profile image path in the database
      const profileImgPath = `/userImages/${req.file.filename}`;
      user.profileImg = profileImgPath;
      await user.save();

      res.status(200).json({
        message: "Profile image uploaded successfully!",
        profileImg: profileImgPath,
      });
    } catch (error) {
      return res.status(500).json({ message: "Failed to upload image", error });
    }
  });
};

// Controller to handle profile image deletion
exports.deleteProfileImage = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    if (user.profileImg) {
      // Remove the old image file from the server
      const imagePath = path.join(
        __dirname,
        "../../userImages",
        path.basename(user.profileImg)
      );
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }

      // Clear the profileImg field in the database
      user.profileImg = null;
      await user.save();
    }

    res.status(200).json({ message: "Profile image deleted successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete image", error });
  }
};
