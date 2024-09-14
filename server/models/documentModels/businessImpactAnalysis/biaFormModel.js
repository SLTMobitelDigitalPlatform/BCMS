const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const biaFormSchema = new Schema(
  {
    sectionName: {
      type: String,
      required: true,
      enum: ["IT", "HR", "control"], 
    },

    owner: { 
      type: Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },

    maintainers: [{ 
      type: Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    }],
     
    viewers: [{ 
      type: Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    }], 
    
    dateApproved: { 
      type: Date, 
      required: true 
    }, 
    
    dateLastReviewed: { 
      type: Date 
    }, 
    
    changesLastReview: { 
      type: String 
    },

    dateNextReview: { 
      type: Date 
    }, 
    
  },
  { timestamps: true }
);

const biaForm = mongoose.model("biaForm", biaFormSchema);

module.exports = biaForm;