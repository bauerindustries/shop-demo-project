const express = require('express');
const cartController = require('../controllers/cart.controller');

const router = express.Router();

// /cart is being prepended to these routes in app.js, via app.use('/cart', cartRoutes);

router.get('/', cartController.getCart); // /cart

router.post('/items', cartController.addCartItem); // /cart/items

router.patch('/items', cartController.updateCartItem); // /cart/items

module.exports = router;