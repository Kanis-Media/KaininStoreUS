const { Client, Environment, SquareClient } = require('square');

const client = new SquareClient({
 token: process.env.SQUARE_ACCESS_TOKEN, // Make sure to set this environment variable
  // environment: Environment.Sandbox, // Or Environment.Production
});

async function getVariationCount(itemId) {
  try {
    // Retrieve the specific catalog object by its ID
    const response = await client.catalogApi.retrieveCatalogObject({
      objectId: itemId,
      includeRelatedObjects: true, // Include related objects like variations
    });

    // Check if the primary object is an ITEM type
    if (response.result.object && response.result.object.type === 'ITEM') {
      const item = response.result.object;
      const variationIds = item.itemData.variations;
      
      if (variationIds) {
        const count = variationIds.length;
        console.log(`The item with ID ${itemId} has ${count} variations.`);
        return count;
      } else {
        console.log(`The item with ID ${itemId} has no variations.`);
        return 0;
      }
    } else {
      console.log(`Object with ID ${itemId} is not an ITEM type.`);
      return 0;
    }
  } catch (error) {
    console.error("Error retrieving catalog object:", error);
    // Handle error appropriately
    throw error;
  }
}

module.exports = {
  getVariationCount
};