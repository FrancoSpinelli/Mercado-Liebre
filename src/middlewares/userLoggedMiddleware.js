let User = require('../models/User');

let userLoggedMidleware = function(req, res, next) {
    res.locals.userIsLogged = false;

    let userNameInCookie = req.cookies.userNameLogged;
    let userInCookie = User.findUserName(userNameInCookie);

    if (userInCookie) {
        req.session.userInSession = userInCookie;
    };

    if (req.session.userInSession){
        res.locals.userIsLogged = true;
        res.locals.UserLogged = req.session.userInSession;
    }
    next();
};

module.exports = userLoggedMidleware;