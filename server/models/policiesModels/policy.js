const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const policychema = new Schema({});

const Policy = new mongoose.model("Policy", policychema);

module.exports = Policy;
