const express = require('express');
const adminController = require('../controllers/admin.controller');
const imageUploadMiddleware = require('../middleware/image-upload.middleware');

const router = express.Router();

// /admin is being prepended to these routes in app.js, via app.use('/admin', adminRoutes);

router.get('/products', adminController.getProducts);

router.get('/products/new', adminController.getNewProduct);

router.post('/products', imageUploadMiddleware, adminController.createNewProduct);

router.get('/products/:id', imageUploadMiddleware, adminController.getUpdateProduct);

router.post('/products/:id', imageUploadMiddleware, adminController.updateProduct);

router.delete('/products/:id', adminController.deleteProduct);

router.get('/orders', adminController.getOrders);

router.patch('/orders/:id', adminController.updateOrder);

module.exports = router;