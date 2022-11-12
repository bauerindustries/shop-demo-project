const stripe = require('stripe')(
  'sk_test_51M32vVLMYJuhTBmfjW0LKvdmo5ZaW4pHYW0kIfVwDB0mXvXeA69i2L5FY7mp9mVBzGa9XfT2pO78c4hNoVLJR3sB00Kwege4XC'
);
// same as:
// const stripe = require('stripe')
// const stripeObj = stripe('sk_test_51M32vVLMYJuhTBmfjW0LKvdmo5ZaW4pHYW0kIfVwDB0mXvXeA69i2L5FY7mp9mVBzGa9XfT2pO78c4hNoVLJR3sB00Kwege4XC')

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
  let orderResponse;
  try {
    orderResponse = await order.save();
  } catch (error) {
    return next(error);
  }

  req.session.orderId = orderResponse.insertedId;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: cart.items.map(function (item) {
      return {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price_data: {
          currency: 'gbp',
          product_data: {
            name: item.product.title,
          },
          unit_amount: (+item.product.price * 100).toFixed(0),
        },
        quantity: item.quantity,
      };
    }),
    mode: 'payment',
    success_url: 'http://localhost:3000/orders/success',
    cancel_url: 'http://localhost:3000/orders/failure',
  });

  res.redirect(303, session.url);

  // res.redirect('/orders');
}

async function getOrders(req, res) {
  try {
    const orders = await Order.findAllForUser(res.locals.uid);
    res.render('customer/orders/all-orders', {
      orders: orders,
    });
  } catch (error) {
    next(error);
  }
}

async function getSuccess(req, res, next) {
  const orderId = req.session.orderId;
  const newStatus = 'Paid';

  try {
    const order = await Order.findById(orderId);
    order.status = newStatus;
    await order.save();
  } catch (error) {
    next(error);
  }

  // order details are saved in db, so clear the session cart
  req.session.cart = null;
  req.session.orderId = null;
  +res.render('customer/orders/success');
}

function getFailure(req, res) {
  res.render('customer/orders/failure');
}

module.exports = {
  addOrder: addOrder,
  getOrders: getOrders,
  getSuccess: getSuccess,
  getFailure: getFailure,
};
