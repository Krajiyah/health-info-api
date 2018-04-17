// DEPENDENCIES
const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const validator = require('express-validator-custom');
const router = require("./routers/main.js");

// CONSTANTS
const port = process.env.PORT || 8080;

// SETUP
var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(validator);
app.use("/", router);

// START SERVER
app.listen(port, () => console.log("Server listening on port: " + port));

module.exports = app;
