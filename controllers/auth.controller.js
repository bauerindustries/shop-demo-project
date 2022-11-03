const User = require('../models/user.model');

function getSignup(req, res) {
  res.render('customer/auth/signup');
}

async function signup(req, res) {
  userData = req.body;

  const user = new User(
    userData.email,
    userData.password,
    userData.fullname,
    userData.street,
    userData.city,
    userData.postcode
  );
  await user.signup();

  // convention: use redirect on POST requests, to avoid potential 'resubmit form' prompts
  res.redirect('/login');
}

function getLogin(req, res) {
  // check it session has login attempted details
  res.render('customer/auth/login');
}

async function login(req, res) {
  const user = new User(req.body.email, req.body.password);
  const existingUser = await user.getUserWithSameEmail();

  if (!existingUser) {
    // flash user/pass to session
    console.log('user does not exist!');
    res.redirect('/login');
    return;
  }

  const passwordCorrect = await user.hasMatchingPassword(existingUser.password);

  if (!passwordCorrect) {
    // flash user/pass to session
    console.log('password does not match!');
    res.redirect('/login');
    return;
  }

  console.log('user name and password match!');

  // if if user exists in db
  // check password
  // authenticate them

  // else
  // flash session cookie with form data
  //redirect to sign-up form
}

module.exports = {
  getSignup: getSignup,
  signup: signup,
  getLogin: getLogin,
  login: login,
};
