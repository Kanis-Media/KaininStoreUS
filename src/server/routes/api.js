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

(async () => {
  await initDbConfig();
  // app.listen(4000, () => console.log("Server ready"));
})();


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

router.get("/productById", async (req, res) => {
  const { categoryId } = req.query;

  try {
    const pool = await sql.connect(dbConfig);

    const result = await pool.request()
      .input("CategoryID", sql.Int, categoryId)
      .query(`
        SELECT 
          p.ProductID,
          p.Name,
          p.Description,
          p.ImageURL,
          p.Price,
          p.SquareID,
          v.ProductVariationID,
          v.SKU,
          v.InStock,
          v.Available,
          v.Allocated,
          v.ProductOptionID
        FROM Products p
        LEFT JOIN ProductVariations v ON p.ProductID = v.ProductID
        WHERE p.CategoryID = @CategoryID
        ORDER BY p.ProductID, v.ProductVariationID
      `);

    const products = {};
    result.recordset.forEach(row => {
      if (!products[row.ProductID]) {
        products[row.ProductID] = {
          productId: row.ProductID,
          name: row.Name,
          description: row.Description,
          imageUrl: row.ImageURL,
          price: row.Price,
          squareId: row.SquareID,
          variations: []
        };
      }

      if (row.ProductVariationID) {
        products[row.ProductID].variations.push({
          variationId: row.ProductVariationID,
          sku: row.SKU,
          inStock: row.InStock,
          available: row.Available,
          allocated: row.Allocated,
          optionId: row.ProductOptionID
        });
      }
    });

    res.json(Object.values(products));
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching products");
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
