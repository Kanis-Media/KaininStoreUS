const { DefaultAzureCredential } = require("@azure/identity");
const { SecretClient } = require("@azure/keyvault-secrets");

async function getSecretValue(secretName) {
  const credential = new DefaultAzureCredential();
  const client = new SecretClient("https://kaininkv.vault.azure.net/", credential);
  const secret = await client.getSecret(secretName);
  return secret.value;
}

async function getAzureSqlToken() {
  const credential = new DefaultAzureCredential();
  const tokenResponse = await credential.getToken("https://database.windows.net/");
  return tokenResponse.token;
}