const User = require('../models/user.model');
const authUtil = require('../utils/authentication.util');
const validationUtil = require('../utils/validation.util');
const sessionFlashUtil = require('../utils/session-flash.util');

function getProducts(req, res) {
  res.render('admin/products/all-products');
}

function getNewProduct(req, res) {
  res.render('admin/products/new-product');
}

function addNewProduct(req, res) {
  res.render('admin/products/');
}

function getOrders(req, res, next) {
  res.render('admin/orders');
}

module.exports = {
  getProducts: getProducts,
  getNewProduct: getNewProduct,
  addNewProduct: addNewProduct,
  getOrders: getOrders,
};
