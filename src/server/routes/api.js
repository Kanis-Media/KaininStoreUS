const express = require("express");
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

module.exports = router;
