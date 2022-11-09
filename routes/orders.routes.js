const express = require('express');
const ordersController = require('../controllers/orders.controller');

const router = express.Router();

// /order is being prepended to these routes in app.js, via app.use('/cart', cartRoutes);

router.get('/', ordersController.getOrders); // /orders

router.post('/', ordersController.addOrder); // /orders

module.exports = router;
