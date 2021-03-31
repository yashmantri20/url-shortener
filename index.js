const express = require("express");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(express.json());

let allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
};
app.use(allowCrossDomain);

app.use("/", require("./routes/index"));
app.use("/url", require("./routes/url"));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
