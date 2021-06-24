let authMiddleware = function (req, res, next) {
    if (!req.session.userInSession){
        return res.redirect('/users/login');
    }
    next();
};

module.exports = authMiddleware;