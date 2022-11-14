const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let mongodbUrl = process.env.MONGODB_URL;
if (mongodbUrl == null || mongodbUrl == "") {
  mongodbUrl = 'mongodb://localhost:27017';
}

let database;

async function connectToDatabase() {
  try {
    const client = await MongoClient.connect(mongodbUrl);
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
