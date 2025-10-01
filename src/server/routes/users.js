import "../utils/azure.js"



app.post('/CreateUser', async (req, res) => {
  const { UserID, Auth0ID, Email, FirstName, LastName } = req.body; // Access form fields
  res.send(`Received UserID: ${UserID}, Auth0ID: ${Auth0ID}, Email: ${Email}, FirstName: ${FirstName}, LastName: ${LastName}`);

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

    const userEmailUsed = await pool.request().query(`
        IF EXISTS (SELECT 1 FROM YourTable WHERE Email = ${Email})
          SELECT 'Record Exists' AS Message
        ELSE
          SELECT 'Record Does Not Exist' AS Message
      `);
    if(userEmailUsed.recordset[0].Message === 'Record Exists'){
      console.log('Email already in use');
      return userEmailUsed.recordset[0].Message;
    }
    else {
      await pool.request().query(`
        INSERT INTO Users (UserID, Auth0ID, Email, FirstName, LastName)
        VALUES (${UserID}, ${Auth0ID}, ${Email}, ${FirstName}, ${LastName})
      `);
      console.log('User created successfully');
      return 'User created successfully';

    }
    res.json(result.recordset);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Database query failed" });
  } finally {
    sql.close(); // Close connection after query
  }
});

module.exports = router;
