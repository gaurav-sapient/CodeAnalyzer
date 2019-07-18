//Importing Packages
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const app = express();

//Configuring Multer
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads");
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  }
});

const upload = multer({ storage: storage });

//Middlewares
app.use(cors());
// app.use(
//   bodyParser.urlencoded({
//     extended: true
//   })
// );
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

//Routes
app.post("/analyze", upload.single("myFile"), (req, res) => {
  //   console.log(req.body);
  //   console.log(req.headers);
  console.log(req.file);
  res.json({ Analyzed: "Yes" });
});

//Server Listening
app.listen(9000, () => {
  console.log("Server started on 9000");
});
