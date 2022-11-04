const User = require('../models/user.model');
const authUtil = require('../utils/authentication.util');
const validationUtil = require('../utils/validation.util');
const sessionFlashUtil = require('../utils/session-flash.util');

function getSignup(req, res) {
  let sessionData = sessionFlashUtil.getSessionData(req);
  if (!sessionData) {
    sessionData = {
      email: '',
      password: '',
      fullname: '',
      street: '',
      city: '',
      postcode: '',
    };
  }
  res.render('customer/auth/signup', { sessionData: sessionData });
}

async function signup(req, res, next) {
  const enteredData = {
    email: req.body.email,
    password: req.body.password,
    fullname: req.body.fullname,
    street: req.body.street,
    city: req.body.city,
    postcode: req.body.postcode,
  };

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
    sessionFlashUtil.flashDataToSession(
      req,
      {
        errorMessage: 'Please check your input and try again.',
        // spread key/value pairs from
        ...enteredData,
      },
      function () {
        res.redirect('/signup');
      }
    );
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
      sessionFlashUtil.flashDataToSession(
        req,
        {
          errorMessage: 'User exists already - try logging in?',
          // spread key/value pairs from
          ...enteredData,
        },
        function () {
          res.redirect('/signup');
        }
      );
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

  const sessionErrorData = {
    errorMessage: 'Please check your email and password',
    email: user.email,
    password: user.password,
  };

  if (!existingUser) {
    sessionFlashUtil.flashDataToSession(req, sessionErrorData, function () {
      res.redirect('/login');
    });
    return;
  }

  let passwordCorrect;
  try {
    passwordCorrect = await user.hasMatchingPassword(existingUser.password);
  } catch (error) {
    return next(error);
  }

  if (!passwordCorrect) {
    sessionFlashUtil.flashDataToSession(req, sessionErrorData, function () {
      res.redirect('/login');
    });
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
