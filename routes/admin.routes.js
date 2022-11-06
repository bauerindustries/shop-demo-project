const express = require('express');
const adminController = require('../controllers/admin.controller');

const router = express.Router();

// /admin is being prepended to these routes in app.js, via app.use('/admin', adminRoutes);

router.get('/products', adminController.getProducts);

router.get('/products/new', adminController.getNewProduct);

router.post('/products/new', adminController.addNewProduct);

router.get('/products/orders', adminController.getOrders);

module.exports = router;