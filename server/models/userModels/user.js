const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const SECRECT_KEY = "abcdefghijklmnop-erihner-ernhin56g-rtjnu";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    serviceNumber: { type: String, required: true },
    designation: { type: String, required: false },
    email: {
      type: String,
      required: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Not Valid Email");
        }
      },
    },
    role: {
      type: String,
      required: true,
      enum: [
        "Super Admin",
        "Secretariat Coordinator",
        "BCM Coordinator",
        "Person Giving Approvals",
        "BCM teams",
        "Employee",
        "customer",
      ],
      default: "customer",
    },
    section: { type: String, required: false },

    callTree: {
      type: [String], // Define as an array of strings
      required: false,
    },
    contactNumber: { type: String, required: false },
    passwordChangedAt: { type: Date, default: "" },
    tokens: [
      {
        token: {
          type: String,
          required: true,
          select: false,
        },
      },
    ],
  },
  { timestamps: true }
);

// hash password
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }

  next();
});

// token generate
userSchema.methods.generateAuthtoken = async function () {
  try {
    let newtoken = jwt.sign(
      { _id: this._id, role: this.role, email: this.email },
      process.env.SECRECT_KEY,
      {
        expiresIn: "1d",
      }
    );

    this.tokens = this.tokens.concat({ token: newtoken });
    await this.save();
    return newtoken;
  } catch (error) {
    res.status(400).json(error);
  }
};

userSchema.methods.isPasswordChanged = async function (JWTtimestamp) {
  if (this.passwordChangedAt) {
    const pwdChangedTimeStamp = this.passwordChangedAt.getTime();
    console.log(pwdChangedTimeStamp, JWTtimestamp);
  }
  return false;
};

// creating model
const User = new mongoose.model("User", userSchema);

module.exports = User;
