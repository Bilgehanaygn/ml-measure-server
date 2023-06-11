const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config({ path: "./.env" });
const diabetesRoute = require("./routes/diabetes.js");
const diabetesMulticlassRoute = require("./routes/diabetes_multiclass.js");
const inviteRoute = require("./routes/invite.js");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", async (req, res) => {
  res.send("is working fine");
});

app.use("/diabetes", diabetesRoute);
app.use("/diabetes_multiclass", diabetesMulticlassRoute);
app.use("/invite", inviteRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

process.on("uncaughtException", function (error) {
  console.log("Uncaught exception has been throwned.");
});
