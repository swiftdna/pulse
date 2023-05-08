const { MongoClient } = require('mongodb');

// Connection URL
// const url = 'mongodb://localhost:27017';
const url = 'mongodb+srv://admin:PK8qeTFI4XvubkUJ@blackpanther.tlzv3tm.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(url);

// Database Name
const dbName = 'pulse';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  COREAPP.db = client.db(dbName);
}

module.exports = main;