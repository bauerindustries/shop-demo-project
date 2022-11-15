const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let mongodbUri = process.env.MONGODB_URL;
if (mongodbUri == null || mongodbUri == "") {
  mongodbUri = 'mongodb://localhost:27017';
}

let database;

async function connectToDatabase() {
  try {
    const client = await MongoClient.connect(mongodbUri);
    database = client.db('online-shop');
  } catch (error) {
    next(error);
    return;
  }
}

function getDb() {
  if(!database) {
    throw new Error('You must connect to database first!');
  }

  return database;
}

module.exports = {
  getDb: getDb,
  connectToDatabase: connectToDatabase,
};
