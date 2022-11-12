function createUserSession(req, user, action) {
    req.session.uid = user._id.toString();
    req.session.isAdmin = user.isAdmin;

    console.log(user.isAdmin);
    console.log(req.session.isAdmin);

    // make callback one save complete
    req.session.save(action);
}

function destroyUserAuthSession(req, action) {
    req.session.uid = null;
    req.session.isAuth = false;
    req.session.isAdmin = false;
}

module.exports = {
    createUserSession: createUserSession,
    destroyUserAuthSession: destroyUserAuthSession,
}