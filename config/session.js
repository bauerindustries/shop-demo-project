const expressSession = require('express-session');
const mongoDbStore = require('connect-mongodb-session');

function createSessionStore() {
  const MongoDbStore = mongoDbStore(expressSession);

  let dbUri = process.env.MONGODB_URL;
  if (dbUri == null || dbUri == '') {
    dbUri = 'mongodb://localhost:27017';
  }

  const store = new MongoDbStore({
    uri: dbUri,
    databaseName: 'online-shop',
    collection: 'sessions',
  });

  return store;
}

function createSessionConfig() {
  return {
    secret: 'super-super-secret',
    resave: false,
    saveUninitialized: false,
    store: createSessionStore(),
    cookie: {
      maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
    },
  };
}

module.exports = createSessionConfig;
