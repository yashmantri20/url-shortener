const express = require("express");
const router = express.Router();

const Url = require("../models/Url");

router.get("/", async (req, res) => {
  return res.json("Welcome to URL Shortener API");
});

router.get("/:token", async (req, res) => {
  try {
    const url = await Url.findOne({ token: req.params.token });

    if (url) return res.redirect(url.mainUrl);

    return res.status(404).json("Url Doesn't Exists");
  } catch (err) {
    return res.status(500).json("Internal Server error");
  }
});

module.exports = router;
