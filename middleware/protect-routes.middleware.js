function protectRoutes(req, res, next) {
  // not authorised or admin
  if (!res.locals.isAuth && !res.locals.isAdmin) {
    return res.redirect('/401');
  }

  // authorised, but not admin and trying to access admin area
  if (req.path.startsWith('/admin') && !res.locals.isAdmin) {
    return res.redirect('/403');
  }

  // admin good to go
  next();
}

module.exports = protectRoutes;
