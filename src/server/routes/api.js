
router.get("/database", async (req, res) => {
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
