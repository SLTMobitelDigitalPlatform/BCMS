const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: { type: String, required: true },
});

const categorySchema = new Schema({
  categoryName: { type: String, required: true },
  items: [itemSchema],
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
