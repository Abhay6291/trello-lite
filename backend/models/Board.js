// models/Board.js
const mongoose = require("mongoose");

const boardSchema = mongoose.Schema({
  title: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Board", boardSchema);