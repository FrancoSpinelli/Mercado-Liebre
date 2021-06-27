let guestMiddleware = function(req, res, next){
    if (req.session.userInSession){
        return res.redirect(`/users/detail/${req.session.userInSession.userName}`);
    }
    next();
};

module.exports = guestMiddleware;
