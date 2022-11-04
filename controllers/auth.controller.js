const User = require('../models/user.model');
const authUtil = require('../utils/authentication');
const validationUtil = require('../utils/validation');

function getSignup(req, res) {
  res.render('customer/auth/signup');
}

async function signup(req, res, next) {
  if (
    !validationUtil.emailIsConfirmed(
      req.body.email,
      // square brackets required as there is a hyphen in that form field name, so dot notation will not work
      req.body['confirm-email']
    ) ||
    !validationUtil.userDetailsAreValid(
      req.body.email,
      req.body.password,
      req.body.fullname,
      req.body.street,
      req.body.city,
      req.body.postcode
    )
  ) {
    res.redirect('/signup');
    return;
  }

  const user = new User(
    req.body.email,
    req.body.password,
    req.body.fullname,
    req.body.street,
    req.body.city,
    req.body.postcode
  );

  try {
    const existsAlready = await user.userExistsAlready();

    if (existsAlready) {
      res.redirect('/signup');
      return;
    }
  } catch (error) {
    next(error);
    return;
  }

  // necessary to pass async errors to built-in error handling
  try {
    await user.signup();
  } catch (error) {
    next(error);
    return;
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
