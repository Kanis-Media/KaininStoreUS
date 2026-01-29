const express = require("express");
const router = express.Router();
const sql = require("mssql");
const { getAzureSqlToken } = require("../az-utils.js");

// Create DB config dynamically because token requires await
async function createDbConfig() {
  return {
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
  };
}

router.get("/users", async (req, res) => {
  try {
    const dbConfig = await createDbConfig();
    const pool = await sql.connect(dbConfig);

    const result = await pool.request().query("SELECT * FROM Users");
    res.json(result.recordset);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Database query failed" });
  } finally {
    sql.close();
  }
});

module.exports = router;
