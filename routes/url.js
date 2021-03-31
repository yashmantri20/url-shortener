const express = require("express");
const router = express.Router();
const validUrl = require("valid-url");
const { nanoid } = require("nanoid");

const Url = require("../models/Url");
require("dotenv").config();

router.post("/shortener", async (req, res) => {
  const { mainUrl } = req.body;

  const token = nanoid(6);

  if (!validUrl.isUri(mainUrl))
    return res.status(401).json({
      message: "Please Enter A Valid Url",
      error: true,
    });

  try {
    let url = await Url.findOne({ mainUrl });

    if (url) return res.json(url);

    const shortenUrl = process.env.BASEURL + "/" + token;

    url = new Url({
      mainUrl,
      shortenUrl,
      token,
      createdAt: new Date(),
    });

    await url.save();

    return res.json(url);
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server error",
      error: true,
    });
  }
});

module.exports = router;
