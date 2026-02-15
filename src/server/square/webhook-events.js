const express = require('express');
const { SquareClient, SignatureVerifier, CatalogObject } = require('square');
// const crypto = require('crypto');
const azutils = require('../az-utils.js');
const sql = require('mssql')
const { dbConfig } = require('../routes/api.js');
const squareUtils = require('./utils.js');
const { getVariationCount } = require('./utils.js');
require('dotenv').config()
const { WebhooksHelper } =  require("square");

const router = express.Router();
// Use express.raw({ type: 'application/json' }) to get the raw body
// needed for signature verification
router.use(express.raw({ type: 'application/json' }));

const squareClient = new SquareClient({
  token: azutils.getSecretValue("SquareDevToken"),
  // environment: 'sandbox', // 'sandbox' or 'production'
});

// Get this from the Webhooks section of your Developer Dashboard
// const signatureVerifier = new SignatureVerifier(process.env.SQUARE_SIGNATURE_KEY); //founda a proper example of how to dop vaslidation I think -NH

// Generate a signature from the notification url, signature key,
// and request body and compare it to the Square signature header.
async function isFromSquare(signature, body) {
  return await WebhooksHelper.verifySignature({
      requestBody: body,
      signatureHeader: signature,
      signatureKey: process.env.SQUARE_WEBHOOK_SIGNATURE_KEY,
      notificationUrl: process.env.NOTIFICATION_URL,
    });
}

router.post('/webhook-endpoint', async (req, res) => {
  //Verify the request 
  const signatureHeader = req.get('x-square-hmacsha256-signature');
  const body = JSON.stringify(req.body); //do not use to string for JSON parsing 

  if (! await isFromSquare(signatureHeader, body)) {
    return res.status(401).send('Invalid Signature');
  }

  const notification = JSON.parse(req.body); 
  const { type, data } = notification;

  // 3. Process the event
  try {
    switch (type) {
      case 'inventory.count.updated':
        console.log(`Inventory updated for location: ${data.location_id}`);
        const { result } = await squareClient.catalog.retrieveCatalogObject({
          objectId: data.object.id,
        });
        // Update Varation support tables and inventory through product varations in the database
        await updateVariationSupportTables(result.object);
        await updateDatabaseInventory(result.object); 
        break;
      default:
        console.log(`Received unhandled event type: ${type}`);
    }
    res.status(200).send('Event received and processed');
  } catch (error) {
    console.error('Error processing webhook event:', error);
    res.status(500).send('Internal Server Error');
  }
});

async function updateVariationSupportTables(catalogObject) {
  console.log(`Updating DB for item ${catalogObject.item_data.name}`);

  const variations = catalogObject.item_data.variations;
  const SquareID = catalogObject.id;

  try {
    const pool = await sql.connect(dbConfig);

    for (const variation of variations) {
      const optionTypeName = variation.type;
      const optionValueName = variation.item_variation_data.name;

      const request = pool.request();
      request.input('OptionTypeName', sql.NVarChar, optionTypeName);
      request.input('OptionValueName', sql.NVarChar, optionValueName);
      request.input('ProductID', sql.NVarChar, SquareID);

      const query = `
        MERGE INTO OptionTypes AS target
        USING (SELECT @OptionTypeName AS OptionTypeName) AS source
        ON target.OptionTypeName = source.OptionTypeName
        WHEN NOT MATCHED THEN
          INSERT (OptionTypeName) VALUES (source.OptionTypeName);

        MERGE INTO OptionValues AS target
        USING (
          SELECT 
            @OptionValueName AS OptionValueName,
            (SELECT OptionTypeID FROM OptionTypes WHERE OptionTypeName = @OptionTypeName) AS OptionTypeID
        ) AS source
        ON target.OptionValueName = source.OptionValueName AND target.OptionTypeID = source.OptionTypeID
        WHEN NOT MATCHED THEN
          INSERT (OptionValueName, OptionTypeID) VALUES (source.OptionValueName, source.OptionTypeID);

        MERGE INTO ProductOptions AS target
        USING (
          SELECT 
            @ProductID AS ProductID,
            (SELECT OptionValueID FROM OptionValues WHERE OptionValueName = @OptionValueName) AS OptionValueID
        ) AS source
        ON target.ProductID = source.ProductID AND target.OptionValueID = source.OptionValueID
        WHEN NOT MATCHED THEN
          INSERT (ProductID, OptionValueID) 
          VALUES (source.ProductID, source.OptionValueID);
      `;

      await request.query(query);
    }
  } catch (err) {
    console.error("Database error:", err);
  } finally {
    sql.close();
  }
}


async function updateDatabaseInventory(catalogObject) {
  console.log(`Updating inventory for item ${catalogObject.item_data.name}`);

  // Build a map once when you fetch the catalog
  const categoryMap = {};
  for (const obj of catalogObjects) {
    if (obj.type === "CATEGORY") {
      categoryMap[obj.id] = obj.category_data.name;
    }
  }


  const productSquareID = catalogObject.id;
  const productName = catalogObject.item_data.name;
  const productDescription = catalogObject.item_data.description || null;
  const productImageURL = catalogObject.item_data.image_url || null;
  const productPrice = catalogObject.item_data.variations[0].item_variation_data.price_money?.amount || 0;
  const categoryId = catalogObject.item_data.category_id || null; 
  const categoryName = categoryId ? categoryMap[categoryId] : null;

  try {
    const pool = await sql.connect(dbConfig);

    const productReq = pool.request();
    productReq.input("SquareID", sql.VarChar, productSquareID);
    productReq.input("Name", sql.VarChar, productName);
    productReq.input("Description", sql.VarChar, productDescription);
    productReq.input("ImageURL", sql.VarChar, productImageURL);
    productReq.input("Price", sql.Money, productPrice);
    productReq.input("Category", sql.NVarChar(100), categoryName);


    await productReq.query(`
      MERGE INTO Products AS target
        USING (SELECT @SquareID AS SquareID) AS source
        ON target.SquareID = source.SquareID
        WHEN MATCHED THEN
          UPDATE SET 
            Name=@Name, 
            Description=@Description, 
            ImageURL=@ImageURL, 
            Price=@Price,
            Category=@Category
        WHEN NOT MATCHED THEN
          INSERT (SquareID, Name, Description, ImageURL, Price, Category)
          VALUES (@SquareID, @Name, @Description, @ImageURL, @Price, @Category);
    `);

    const productIdResult = await pool.request()
      .input("SquareID", sql.VarChar, productSquareID)
      .query(`SELECT ProductID FROM Products WHERE SquareID=@SquareID`);

    const productID = productIdResult.recordset[0].ProductID;

    const existingVarResult = await pool.request()
      .input("ProductID", sql.Int, productID)
      .query(`SELECT SquareID FROM ProductVariations WHERE ProductID=@ProductID`);

    const existingVariationIDs = existingVarResult.recordset.map(r => r.SquareID);

    const incomingVariationIDs = catalogObject.item_data.variations.map(v => v.id);

    const variationsToDelete = existingVariationIDs.filter(id => !incomingVariationIDs.includes(id));

    if (variationsToDelete.length > 0) {
      const deleteReq = pool.request();
      deleteReq.input("ProductID", sql.Int, productID);
      await deleteReq.query(`
        DELETE FROM ProductVariations
        WHERE ProductID=@ProductID
          AND SquareID IN ('${variationsToDelete.join("','")}')
      `);
    }

    // UPSERT EACH VARIATION
    for (const variation of catalogObject.item_data.variations) {
      const variationSquareID = variation.id;
      const sku = variation.item_variation_data.sku;
      const available = variation.item_variation_data.available_quantity || 0;
      const allocated = variation.item_variation_data.allocated_quantity || 0;
      const inStock = available - allocated;

      const optionTypeName = variation.type;
      const optionValueName = variation.item_variation_data.name;

      const optionReq = pool.request();
      optionReq.input("ProductID", sql.Int, productID);
      optionReq.input("OptionTypeName", sql.VarChar, optionTypeName);
      optionReq.input("OptionValueName", sql.VarChar, optionValueName);

      const optionResult = await optionReq.query(`
        SELECT po.ProductOptionID
        FROM ProductOptions po
        JOIN OptionValues ov ON po.OptionValueID = ov.OptionValueID
        JOIN OptionTypes ot ON ov.OptionTypeID = ot.OptionTypeID
        WHERE po.ProductID = @ProductID
          AND ov.OptionValueName = @OptionValueName
          AND ot.OptionTypeName = @OptionTypeName
      `);

      const productOptionID = optionResult.recordset[0]?.ProductOptionID || null;

      // UPSERT VARIATION
      const varReq = pool.request();
      varReq.input("SquareID", sql.VarChar, variationSquareID);
      varReq.input("SKU", sql.VarChar, sku);
      varReq.input("Available", sql.Int, available);
      varReq.input("Allocated", sql.Int, allocated);
      varReq.input("InStock", sql.Int, inStock);
      varReq.input("ProductID", sql.Int, productID);
      varReq.input("ProductOptionID", sql.Int, productOptionID);

      await varReq.query(`
        MERGE INTO ProductVariations AS target
        USING (SELECT @SquareID AS SquareID) AS source
        ON target.SquareID = source.SquareID
        WHEN MATCHED THEN
          UPDATE SET SKU=@SKU, Available=@Available, Allocated=@Allocated, InStock=@InStock, ProductID=@ProductID, ProductOptionID=@ProductOptionID
        WHEN NOT MATCHED THEN
          INSERT (SquareID, SKU, Available, Allocated, InStock, ProductID, ProductOptionID)
          VALUES (@SquareID, @SKU, @Available, @Allocated, @InStock, @ProductID, @ProductOptionID);
      `);
    }

  } catch (err) {
    console.error("Database error:", err);
  } finally {
    sql.close();
  }
}


module.exports = router;