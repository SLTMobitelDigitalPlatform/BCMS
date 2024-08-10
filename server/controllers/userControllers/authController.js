const User = require("../../models/userModels/user");
const UserOtp = require("../../models/userModels/userOtp");
const nodemailer = require("nodemailer");
const util = require("util");
const jwt = require("jsonwebtoken");

// email config
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

// user send otp
exports.userOtpSend = async (req, res) => {
  const { email, serviceNumber } = req.body;

  if (!email) {
    res.status(400).json({ error: "Please Enter Your Email" });
  }

  if (!serviceNumber) {
    res.status(400).json({ error: "Please Enter Your Service Number" });
  }

  try {
    const presuer = await User.findOne({ email: email });
    const serviceUser = await User.findOne({ serviceNumber: serviceNumber });

    if (presuer && presuer.serviceNumber === serviceUser.serviceNumber) {
      const OTP = Math.floor(100000 + Math.random() * 900000);

      const existEmail = await UserOtp.findOne({ email: email });

      if (existEmail) {
        const updateData = await UserOtp.findByIdAndUpdate(
          { _id: existEmail._id },
          {
            otp: OTP,
          },
          { new: true }
        );
        await updateData.save();

        const mailOptions = {
          from: process.env.EMAIL,
          to: email,
          subject: "Sending Eamil For Otp Validation",
          text: `OTP:- ${OTP}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log("error", error);
            res.status(400).json({ error: "email not send" });
          } else {
            console.log("Email sent", info.response);
            res.status(200).json({ message: "Email sent Successfully" });
          }
        });
      } else {
        const saveOtpData = new UserOtp({
          email,
          otp: OTP,
        });

        await saveOtpData.save();
        const mailOptions = {
          from: process.env.EMAIL,
          to: email,
          subject: "Sending Eamil For Otp Validation",
          text: `OTP:- ${OTP}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log("error", error);
            res.status(400).json({ error: "email not send" });
          } else {
            console.log("Email sent", info.response);
            res.status(200).json({ message: "Email sent Successfully" });
          }
        });
      }
    } else {
      res.status(400).json({
        error: "This User Not Exist In our Db or Invalide Credentials",
      });
    }
  } catch (error) {
    res.status(400).json({ error: "Invalid Details", error });
  }
};

exports.userLogin = async (req, res) => {
  const { email, otp } = req.body.data;

  if (!otp || !email) {
    res.status(400).json({ error: "Please Enter Your OTP and email" });
  }

  try {
    const otpverification = await UserOtp.findOne({ email: email });

    if (otpverification.otp === otp) {
      const preuser = await User.findOne({ email: email });

      // token generate
      const token = await preuser.generateAuthtoken();
      res.status(200).json({
        message: "User Login Succesfully Done",
        token: token,
        role: preuser.role,
      });
    } else {
      res.status(400).json({ error: "Invalid Otp" });
    }
  } catch (error) {
    res.status(400).json({ error: "Invalid Details", error });
  }
};

exports.protect = async (req, res, next) => {
  // read the token
  const testToken = req.headers.authorization;

  let token;
  let decodedToken;
  if (testToken && testToken.startsWith("Bearer")) {
    token = testToken.split(" ")[1];
  }
  // console.log(token);
  if (!token) {
    return res.status(401).json({ message: "UnAuthorized!" });
  }

  // validate token

  try {
    decodedToken = await util.promisify(jwt.verify)(
      token,
      process.env.SECRECT_KEY
    );
    // console.log(decodedToken);
  } catch (error) {
    // Handle token errors
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token has expired!" });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid token!" });
    }
    // Handle other unexpected errors
    return res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }

  // if user exist or not
  const user = await User.findById(decodedToken._id);
  if (!user) {
    return res.status(401).json({ error: "Token Does not Exist!" });
  }

  // if user changed the pwd after token issued
  const isPasswordChanged = await user.isPasswordChanged(decodedToken.iat);

  if (isPasswordChanged) {
    return res
      .status(401)
      .json({ error: "Password has been changed! Please login again!" });
  }

  // allow user to access route
  req.user = user;
  next();
};

exports.restrict = (...role) => {
  //   return (req, res, next) => {
  //     if (req.user.role !== role) {
  //       return res
  //         .status(403)
  //         .json({ error: "You do not have permission for this action!" });
  //     }
  //     next();
  //   };
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {
      return res
        .status(403)
        .json({ error: "You do not have permission for this action!" });
    }
    next();
  };
};

exports.checkAuth = async (req, res) => {
  try {
    res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(400);
  }
};
