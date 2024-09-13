const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const biaFormSchema = new Schema(
  {
    sectionName: {
        type: String,
        required: true,
        enum: ["IT", "HR", "controll"],
        // default: "",
      },

    owner:{ type: Schema.Types.ObjectId, ref: "User", required: true },

    maintainers: { type: String, required: true },

    viewers: { type: String, required: true },

    dateApproved: { type: String, required: true },

    dateLastReviewed: { type: String},

    changesLastReview: { type: String},

    dateNextReview: { type: String},

  },
  { timestamps: true }
);

const biaForm = mongoose.model("biaForm", biaFormSchema);

module.exports = biaForm;
