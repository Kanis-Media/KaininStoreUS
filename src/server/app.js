const { getSecretValue } = require("./az-utils.js")
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const apiRouter = require("./routes/api");
const axios = require('axios');

const app = express();

app.use(logger("dev"));
app.use(express.json({
  verify: (req, res, buf) => {
    // We store the raw buffer as a string on the request object
    // Square requires the exact raw body for signature verification
    req.rawBody = buf.toString();
  }
}));

app.use(cookieParser());

const squareWebhook = require("./square/webhook-events.js");
app.use("/webhook-endpoint", express.raw({ type: 'application/json' }), squareWebhook);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// mount our api router here
app.use("/api", apiRouter);
// app.use("/", squareWebhook);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../client/build")));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  console.log("req.path", req.path);
  res.sendFile(path.join(__dirname + "../client/build/index.html"));
});


module.exports = app;
