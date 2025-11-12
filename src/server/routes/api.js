const express = require("express");
const axios = require('axios');
const router = express.Router();
const sql = require('mssql')
const { DefaultAzureCredential } = require("@azure/identity");
const { SecretClient } = require("@azure/keyvault-secrets");
const getAzureSqlToken = require("../az-utils.js")

// async function getSecretValue(secretName) {
//   const credential = new DefaultAzureCredential();
//   const client = new SecretClient("https://kaininkv.vault.azure.net/", credential);
//   const secret = await client.getSecret(secretName);
//   return secret.value;
// }

// async function getAzureSqlToken() {
//   const credential = new DefaultAzureCredential();
//   const tokenResponse = await credential.getToken("https://database.windows.net/");
//   return tokenResponse.token;
// }


router.get("/users", async (req, res) => {
  try {
    const pool = await sql.connect({
      server: "kainin-ltd.database.windows.net",
      database: "KaininStoreUS",
      authentication: {
      type: "azure-active-directory-access-token",
      options: {
        token: await getAzureSqlToken()
      }
    },
    options: {
      encrypt: true
    }

    });

    const result = await pool.request().query("SELECT * FROM Users");
    res.json(result.recordset);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Database query failed" });
  } finally {
    sql.close(); // Close connection after query
  }
});


router.post("/create_user", async (req, res) => {
  try {
    const authZeroDomain = "dev-vvaajzhqco4eadv3.us.auth0.com";
    const authZeroClientId = process.env.authZeroClientId;
    const authZeroClientSecret = process.env.authZeroClientSecret;
    console.log("Creating user with email:", req.body.email);
    const tokenResponse = await axios.post(`https://${authZeroDomain}/oauth/token`, {
      grant_type: "authorization_code",
      client_id: authZeroClientId,
      client_secret: authZeroClientSecret,
      audience: `https://${authZeroDomain}/api/v2/`
    });
    const token = tokenResponse.data.access_token;
    console.log(`The TOKEN: ${token}`)
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
  if (error.response) {
    console.error("Auth0 error response:");
    console.error("Status:", error.response.status);
    console.error("Headers:", error.response.headers);
    console.error("Data:", error.response.data);
  } else if (error.request) {
    console.error("No response received from Auth0:");
    console.error(error.request);
  } else {
    console.error("Error setting up Auth0 request:");
    console.error(error.message);
  }

  res.status(500).json({ error: "Auth0 request failed" });
}

});

module.exports = router;
