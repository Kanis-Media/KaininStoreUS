const { getSecretValue } =  require("./az-utils.js")
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const apiRouter = require("./routes/api");
const axios = require('axios');
const cors = require('cors');


const app = express();

// const corsOptions = {
//   origin: 'https://www.your-allowed-client-app.com', // Only this origin can access
//   methods: 'GET,POST,PUT,DELETE', // Allowed HTTP methods
//   allowedHeaders: 'Content-Type,Authorization', // Allowed headers
//   credentials: true, // Allow cookies/auth headers to be sent cross-origin
//   optionsSuccessStatus: 204 // Some legacy browsers need this
// }
// app.use(cors(corsOptions));
app.use(cors()); //will leave open rn for dev 

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// mount our api router here
const { router } = require('./routes/api.js');
app.use('/api', router);


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
