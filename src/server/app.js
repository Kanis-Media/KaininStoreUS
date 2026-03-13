const { getSecretValue } = require("./az-utils.js")
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const apiRouter = require("./routes/api");
const squareWebhook = require("./square/webhook-events.js");

const app = express();

app.use(logger("dev"));

// Capture raw body BEFORE any JSON parsing
app.use(express.json({
  verify: (req, res, buf) => {
    req.rawBody = buf.toString();
  }
}));

app.use(cookieParser());

//mustg come first 
app.use(
  "/webhook-endpoint",
  express.raw({ type: 'application/json' }),
  squareWebhook
);

// Now safe to parse JSON for the rest of the app
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API routes
app.use("/api", apiRouter);

// Static files
app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = app;
