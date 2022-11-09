const User = require('../models/user.model');
const Order = require('../models/order.model');

async function addOrder(req, res, next) {
  const cart = res.locals.cart;

  let userDocument;
  try {
    userDocument = await User.findById(res.locals.uid);
  } catch (error) {
    return next(error);
  }

  const order = new Order(cart, userDocument);

  try {
    await order.save();
  } catch (error) {
    return next(error);
  }

  // order details are saved in db, so clear the session cart
  req.session.cart = null;

  res.redirect('/orders');
}

function getOrders(req, res) {
  res.render('customer/orders/all-orders');
}

module.exports = {
  addOrder: addOrder,
  getOrders: getOrders,
};
