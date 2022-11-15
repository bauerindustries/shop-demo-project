require('dotenv').config();
const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let mongodbUrl = process.env.MONGODB_URL;
let database;

async function connectToDatabase() {
    const client = await MongoClient.connect(mongodbUrl);
    database = client.db('online-shop');
}

function getDb() {
  if (!database) {
    throw new Error('You must connect to database first!');
  }

  return database;
}

module.exports = {
  getDb: getDb,
  connectToDatabase: connectToDatabase,
};
