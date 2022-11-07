// third party
const express = require('express');
const path = require('path');
const ejs = require('ejs');
const csrf = require('csurf');
const expressSession = require('express-session');

const createSessionConfig = require('./config/session');
const db = require('./data/database');

// custom middleware
const errorHandlerMiddleware = require('./middleware/error-handler.middleware');
const csrfTokenMiddleware = require('./middleware/csrf-token.middleware');
const protectRoutesMiddleware = require('./middleware/protect-routes.middleware');
const checkAuthStatusMiddleware = require('./middleware/check-auth.middleware');


// routes
const baseRoutes = require('./routes/base.routes');
const authRoutes = require('./routes/auth.routes');
const productsRoutes = require('./routes/products.routes');
const adminRoutes = require('./routes/admin.routes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use('/products/assets/', express.static('product-data'));
// middleware to allow data attached to requests (esp. form submission)
app.use(express.urlencoded({ extended: false }));

const sessionConfig = createSessionConfig();
app.use(expressSession(sessionConfig));

app.use(csrf());
// custom middleware does not need to be called, unlike 3rd-party middlewares
app.use(csrfTokenMiddleware);

app.use(checkAuthStatusMiddleware);

app.use(baseRoutes);
app.use(authRoutes);
app.use('/products', productsRoutes);
app.use(protectRoutesMiddleware); 
app.use('/admin', adminRoutes); 

// error handling
app.use(errorHandlerMiddleware);

// .then because connectToDatabase returns a promise
db.connectToDatabase()
  .then(function () {
    app.listen(3000);
  })
  .catch(function (error) {
    console.log('Failed to connect to the database');
    console.log(error);
  });
