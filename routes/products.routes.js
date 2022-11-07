const express = require('express');
const productsController = require('../controllers/products.controller');

const router = express.Router();

// /products is being prepended to these routes in app.js, via app.use('/products', productsRoutes);

router.get('', productsController.getAllProducts);

router.get('/:id', productsController.getProductDetails);

module.exports = router;