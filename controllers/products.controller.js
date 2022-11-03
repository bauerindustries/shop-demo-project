const authUtil = require('../utils/authentication');

function getAllProducts(req, res) {
  res.render('customer/products/all-products');
}

module.exports = {
  getAllProducts: getAllProducts,
};
