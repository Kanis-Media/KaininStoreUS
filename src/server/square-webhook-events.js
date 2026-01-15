const express = require('express');
const { Client, SignatureVerifier } = require('square');
const crypto = require('crypto');
import azutils from './az-utils.js';
const sql = require('mssql')
import { dbConfig } from './routes/api.js';
import './square-utils.js';
import { getVariationCount } from './square-utils.js';

const app = express();
// Use express.raw({ type: 'application/json' }) to get the raw body
// needed for signature verification
app.use(express.raw({ type: 'application/json' })); 

const squareClient = new Client({
  accessToken: azutils.getSecretValue("SquareDevToken"),
  environment: 'sandbox', // 'sandbox' or 'production'
});

// Get this from the Webhooks section of your Developer Dashboard
const signatureVerifier = new SignatureVerifier(process.env.SQUARE_SIGNATURE_KEY); 


app.post('/webhook-endpoint', async (req, res) => {
  // 1. Verify the notification's authenticity
  const hmacSignature = req.get('X-Square-Signature');
  const requestUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  const rawBody = req.body.toString(); // Get the raw body as a string

  if (!signatureVerifier.isValidSignature(rawBody, hmacSignature, requestUrl)) {
    return res.status(401).send('Invalid Signature');
  }

  // 2. Parse the JSON body after verification
  const notification = JSON.parse(rawBody); 
  const { type, data } = notification;

  // 3. Process the event
  try {
    switch (type) {
      case 'inventory.count.updated':
        console.log(`Inventory updated for location: ${data.location_id}`);
        // Use the SDK to get more details if needed
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

  const productSquareID = catalogObject.id;
  const productName = catalogObject.item_data.name;
  const productDescription = catalogObject.item_data.description || null;
  const productImageURL = catalogObject.item_data.image_url || null;
  const productPrice = catalogObject.item_data.variations[0].item_variation_data.price_money?.amount || 0;

  try {
    const pool = await sql.connect(dbConfig);

    // Update Products table
    const productRequest = pool.request();
    productRequest.input('SquareID', sql.VarChar(255), productSquareID);
    productRequest.input('Name', sql.VarChar(255), productName);
    productRequest.input('Description', sql.VarChar(255), productDescription);
    productRequest.input('ImageURL', sql.VarChar(255), productImageURL);
    productRequest.input('Price', sql.Money, productPrice);

    const productQuery = `
      MERGE INTO Products AS target
      USING (SELECT @SquareID AS SquareID) AS source
      ON target.SquareID = source.SquareID
      WHEN MATCHED THEN
        UPDATE SET Name = @Name, Description = @Description, ImageURL = @ImageURL, Price = @Price
      WHEN NOT MATCHED THEN
        INSERT (SquareID, Name, Description, ImageURL, Price)
        VALUES (@SquareID, @Name, @Description, @ImageURL, @Price);
    `;
    await productRequest.query(productQuery);

    // Update ProductVariations table
    for (const variation of catalogObject.item_data.variations) {
      const variationSquareID = variation.id;
      const sku = variation.item_variation_data.sku;
      const available = variation.item_variation_data.available_quantity || 0;
      const allocated = variation.item_variation_data.allocated_quantity || 0;
      const inStock = available - allocated;
      const productOptionID = null; // You may need to resolve this from your OptionValues/ProductOptions tables

      const variationRequest = pool.request();
      variationRequest.input('SquareID', sql.VarChar(255), variationSquareID);
      variationRequest.input('SKU', sql.VarChar(80), sku);
      variationRequest.input('Available', sql.Int, available);
      variationRequest.input('Allocated', sql.Int, allocated);
      variationRequest.input('InStock', sql.Int, inStock);
      variationRequest.input('ProductID', sql.VarChar(255), productSquareID);
      variationRequest.input('ProductOptionID', sql.Int, productOptionID);

      const variationQuery = `
        MERGE INTO ProductVariations AS target
        USING (SELECT @SquareID AS SquareID) AS source
        ON target.SquareID = source.SquareID
        WHEN MATCHED THEN
          UPDATE SET SKU = @SKU, Available = @Available, Allocated = @Allocated, InStock = @InStock, ProductID = @ProductID, ProductOptionID = @ProductOptionID
        WHEN NOT MATCHED THEN
          INSERT (SquareID, SKU, Available, Allocated, InStock, ProductID, ProductOptionID)
          VALUES (@SquareID, @SKU, @Available, @Allocated, @InStock, @ProductID, @ProductOptionID);
      `;
      await variationRequest.query(variationQuery);
    }
  } catch (err) {
    console.error("Database error:", err);
  } finally {
    sql.close();
  }
}