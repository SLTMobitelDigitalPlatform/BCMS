// const mongoose = require("mongoose");

// const callTreeSchema = new mongoose.Schema({
//   label: String,
//   mobileNumber: String,
//   children: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "CallTree",
//     },
//   ],
// });

// const CallTree = mongoose.model("CallTree", callTreeSchema);
// module.exports = CallTree;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const callTreeSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CallTree",
    default: null,
  }, // Ref to parent node
});

const CallTree = mongoose.model("CallTree", callTreeSchema);
module.exports = CallTree;
