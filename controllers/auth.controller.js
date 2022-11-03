function getSignup(req, res) {
  res.render('customer/auth/signup');
}

async function signup(req, res) {
  
  // res.redirect('customer/auth/login');
}

function getLogin(req, res) {
    //
  }

module.exports = {
  getSignup: getSignup,
  signup: signup,
  getLogin: getLogin,
};
