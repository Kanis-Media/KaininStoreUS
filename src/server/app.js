const { getSecretValue } =  require("./az-utils.js")
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const apiRouter = require("./routes/api");
const axios = require('axios');

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// mount our api router here
app.use("/api", apiRouter);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../client/build")));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  console.log("req.path", req.path);
  res.sendFile(path.join(__dirname + "../client/build/index.html"));
});


//  Login to saure api 

// const sqaureAuthResponse = axios.get('https://connect.squareup.com/v2/customers', {
//   headers: {
//     'Authorization': getSecretValue('SqaureSandboxAccessToken'),
//     'Content-Type': 'application/json'
//   }
// });
// console.log(sqaureAuthResponse.data);


module.exports = app;
