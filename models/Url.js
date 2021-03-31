const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  token: String,
  mainUrl: String,
  shortenUrl: String,
  createdAt: String,
});

module.exports = mongoose.model("Url", urlSchema);
