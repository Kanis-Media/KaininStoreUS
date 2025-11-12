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

app.post("/create_user", async (req, res) => {
  try {
    const authZeroDomain = "dev-vvaajzhqco4eadv3.us.auth0.com";
    const authZeroClientId = "jFWJerVb7s79dNJjvLym9KWuBqMmyF9b";
    const authZeroClientSecret = "-MCqYkgciOLtkl33bJU-8HDCmmt5X5_3MjVzBod1vmonwEGLAkkz17c-A6Hp5Y8W";
   
    const tokenResponse = await axios.post(`https://${authZeroDomain}/oauth/token`, {
      grant_type: "client_credentials",
      client_id: authZeroClientId,
      client_secret: authZeroClientSecret,
      audience: `https://${authZeroDomain}/api/v2/`
    });
    const token = tokenResponse.data.access_token;
    const userResponse = await axios.post(
      `https://${authZeroDomain}/api/v2/users`,
      {
        email: req.body.email,
        password: req.body.password,
        connection: "Username-Password-Authentication"
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    res.json(userResponse.data);
  } catch (error) {
    console.error("Auth0 error:", error.response?.data || error.message);
    res.status(500).json({ error: "Auth0 request failed" });
  }
});

module.exports = app;
