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
        // Call a function to update your database
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

// Example function to interact with your database
async function updateDatabaseInventory(catalogObject) {
  console.log(`Updating DB for item ${catalogObject.item_data.name}`);

  const optionTypeList = catalogObject.item_data.variations;

  const optionTypeValueList = {};
  optionTypeList.forEach(variation => {
    optionTypeValueList[variation.type] = variation.item_variation_data.name;
  });
  const SquareID = catalogObject.id;
  const SKUQuantity = getVariationCount(catalogObject.item_data.variations[0].id);

   //merge query into Option Types, Option Values, and ProductOptions Tables 
  try {

    const pool = await sql.connect(dbConfig);

   
    const req = await pool.request();

    const query = `
      MERGE INTO OptionTypes AS target
     
    `;

    req.input('SquareID', sql.NVarChar, SquareID);
    req.input('SKUQuantity', sql.Int, SKUQuantity);

    await req.query(query);
  } 
    catch (err) {
    console.error("Database error:", err);
  } finally {
    sql.close(); // Close connection after query
  }

  //merge query to update inventory
  try {
      sql.connect(dbConfig);
  
      const req = sql.Request();

      
      const query = `
        MERGE INTO Products AS target
        USING (SELECT @ItemId AS ItemId, @Quantity AS Quantity) AS source
      `;
      
 
    } catch (err) {
      console.error("Database error:", err);
      res.status(500).json({ error: "Database query failed" });
    } finally {
      sql.close(); // Close connection after query
    }
  
}


// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
