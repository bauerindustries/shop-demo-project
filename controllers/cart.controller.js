const Product = require('../models/product.model');
const Cart = require('../models/cart.model');

async function addCartItem(req, res, next) {
  let product;
  try {
    product = await Product.findById(req.body.productId);
  } catch (error) {
    return next(error);
  }

  const cart = res.locals.cart;
  cart.addItem(product);
  req.session.cart = cart;

  res.status(201).json({
    message: 'Product added to cart',
    newTotalItems: cart.totalQuantity,
  });
}

function getCart(req, res) {
  // cart contents are held in res.locals.cart, so no need to retrieve/pass to template
  res.render('customer/cart/cart');
}

function updateCartItem(req, res) {
  const cart = res.locals.cart;
  const updatedItemData = cart.updateItem(
    req.body.productId,
    req.body.quantity
  );
  req.session.cart = cart;

  res.status(201).json({
    message: 'Cart updated',
    updatedCartData: {
      newTotalQuantity: cart.totalQuantity,
      newTotalPrice: cart.totalPrice,
      updatedItemPrice: updatedItemData.updatedItemPrice,
    },
  });
}

module.exports = {
  addCartItem: addCartItem,
  getCart: getCart,
  updateCartItem: updateCartItem,
};
