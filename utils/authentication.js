function createUserSession(req, user, action) {
    req.session.uid = user._id.toString();
    // make callback one save complete
    req.session.save(action);
}

function destroyUserAuthSession(req, action) {
    req.session.uid = null;
    req.session.isAuth = false;
}

module.exports = {
    createUserSession: createUserSession,
    destroyUserAuthSession: destroyUserAuthSession,
}