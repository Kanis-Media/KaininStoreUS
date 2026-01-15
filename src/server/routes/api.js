const express = require("express");
const router = express.Router();
const sql = require("mssql");
const azutils = require("../az-utils.js");

let dbConfig = null;

async function initDbConfig() {
  const token = await azutils.getAzureSqlToken();

  dbConfig = {
    server: "kainin-ltd.database.windows.net",
    database: "KaininStoreUS",
    authentication: {
      type: "azure-active-directory-access-token",
      options: {
        token
      }
    },
    options: {
      encrypt: true
    }
  };
}

initDbConfig(); // initialize on startup

router.get("/users", async (req, res) => {
  try {
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

router.get("/products", async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().query("SELECT * FROM Products");
    res.json(result.recordset);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Database query failed" });
  } finally {
    sql.close();
  }
});

router.get("/productVariationsFromProductID", async (req, res) => {
  const productID = req.params.productID;
  try {
    const pool = await sql.connect(dbConfig);
    req.input("ProductID", sql.Int, productID);
    const result = await pool.request()
      .input("ProductID", sql.Int, productID)
      .query("SELECT * FROM ProductVariations WHERE ProductID=@ProductID");
    res.json(result.recordset);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Database query failed" });
  } finally {
    sql.close();
  }
});

// I do not think we need this with the auth0 action I set up -NH 
// router.post("/create_user", async (req, res) => {
//   try { 
//     const authZeroDomain = "dev-vvaajzhqco4eadv3.us.auth0.com";
//     // M2M application credentials need to be set here. https://manage.auth0.com/dashboard/us/dev-vvaajzhqco4eadv3/applications/LDB0D0Uxbh2pmukdn7naIh0PXZSdGoKL/settings
//     const authZeroClientId = process.env.authZeroClientId;
//     const authZeroClientSecret = process.env.authZeroClientSecret;
//     const tokenResponse = await axios.post(`https://${authZeroDomain}/oauth/token`, {
//       grant_type: "client_credentials",
//       client_id: authZeroClientId,
//       client_secret: authZeroClientSecret,
//       audience: `https://${authZeroDomain}/api/v2/`
//     });
//     const token = tokenResponse.data.access_token;
//     console.log(`The TOKEN: ${token}`)
//     const userResponse = await axios.post(
//       `https://${authZeroDomain}/api/v2/users`,
//       {
//         email: req.body.email,
//         password: req.body.password,
//         connection: "Username-Password-Authentication"
//       },
//       {
//         headers: { Authorization: `Bearer ${token}` }
//       }
//     );
//     res.json(userResponse.data);
//   } catch (error) {
//   if (error.response) {
//     console.error("Auth0 error response:");
//     console.error("Status:", error.response.status);
//     console.error("Headers:", error.response.headers);
//     console.error("Data:", error.response.data);
//   } else if (error.request) {
//     console.error("No response received from Auth0:");
//     console.error(error.request);
//   } else {
//     console.error("Error setting up Auth0 request:");
//     console.error(error.message);
//   }
//   res.status(500).json({ error: "Auth0 request failed" });
// }
// });

module.exports = {
  router,
  dbConfig 
};
