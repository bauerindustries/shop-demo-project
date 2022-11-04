const User = require('../models/user.model');
const authUtil = require('../utils/authentication');

function getSignup(req, res) {
  res.render('customer/auth/signup');
}

async function signup(req, res, next) {
  userData = req.body;

  const user = new User(
    userData.email,
    userData.password,
    userData.fullname,
    userData.street,
    userData.city,
    userData.postcode
  );

  // necessary to pass async errors to built-in error handling
  try {
    await user.signup();
  } catch (error) {
    return next(error);
  }

  // convention: use redirect on POST requests, to avoid potential 'resubmit form' prompts
  res.redirect('/login');
}

function getLogin(req, res) {
  // check it session has login attempted details
  res.render('customer/auth/login');
}

async function login(req, res) {
  const user = new User(req.body.email, req.body.password);

  let existingUser;
  try {
    existingUser = await user.getUserWithSameEmail();
  } catch (error) {
    return next(error);
  }

  if (!existingUser) {
    // flash user/pass to session
    res.redirect('/login');
    return;
  }


let passwordCorrect;
  try {
    passwordCorrect = await user.hasMatchingPassword(existingUser.password);
  } catch (error) {
    return next(error);
  }

  if (!passwordCorrect) {
    // flash user/pass to session
    res.redirect('/login');
    return;
  }

  authUtil.createUserSession(req, existingUser, function () {
    res.redirect('/products');
  });
}

function logout(req, res) {
  authUtil.destroyUserAuthSession(req);
  res.redirect('/login');
}

module.exports = {
  getSignup: getSignup,
  signup: signup,
  getLogin: getLogin,
  login: login,
  logout: logout,
};
