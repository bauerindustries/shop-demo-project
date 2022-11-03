function createUserSession(req, user, action) {
    req.session.uid = user._id.toString();
    // make callback one save complete
    req.session.save(action);
}

module.exports = {
    createUserSession: createUserSession,
}