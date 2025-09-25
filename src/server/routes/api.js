const express = require("express");
const router = express.Router();
const sql = require('mssql')
const { DefaultAzureCredential } = require("@azure/identity");
const { SecretClient } = require("@azure/keyvault-secrets");

async function getSecretValue(secretName) {
  const credential = new DefaultAzureCredential();
  const client = new SecretClient("https://kaininkv.vault.azure.net/", credential);
  const secret = await client.getSecret(secretName);
  return secret.value;
}

/* GET users listing. */
router.get("/users", function(req, res, next) {
  console.log('get "users" route hit');
  res.send({ users: ["joe", "bernie", "tulsi", "donald", "bill"] });
});

router.get("/database", async (req, res) => {
  try {
    const pool = await sql.connect({
      server: "NEHEMIAHS_ZEN\\SQLEXPRESS",
      database: "KaininStoreUS",
      user: "KaininStoreUS",
      password: await getSecretValue("KaininOnlineStoreUSDBPassword"),
      options: {
        encrypt: true,
        trustServerCertificate: true,
      },
    });

    const result = await pool.request().query("SELECT * FROM Users WHERE UserId = 0");
    res.json(result.recordset);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Database query failed" });
  } finally {
    sql.close(); // Close connection after query
  }
});

module.exports = router;
