//Importing Packages
const fs = require("fs");

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const app = express();

const runScript = require("./runScript");

//Global Variables
let fileSaved;
let errors = [];

//Configuring Multer
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads");
  },
  filename: function(req, file, cb) {
    const { fieldname, originalname } = file;
    fileSaved =
      fieldname +
      "-" +
      Date.now() +
      originalname.substring(originalname.indexOf("."), originalname.length);
    cb(null, fileSaved);
  }
});

const upload = multer({ storage: storage });

//Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(upload.single("codeFile"));

//Routes
app.post("/analyze", (req, res) => {
  // Calling runScript
  runScript("./analyzer.js", function(err) {
    if (err) throw err;
    console.log("finished running some-script.js");
  });

  res.json({ Analyzed: "Yes" });
});

//Server Listening
app.listen(9000, () => {
  console.log("Server started on 9000");
});
