let db = require('../database/models');

let userLoggedMiddleware = async function(req, res, next) { 
    res.locals.userIsLogged = false;
    try{
        let userNameInCookie = req.cookies.userNameLogged;
        let userInCookie;
        if (userNameInCookie){
            return userInCookie = await db.Users.findAll({
                where: {userName: userNameInCookie}
            });
        }
        if (userInCookie) {
            req.session.userInSession = userInCookie;
        };
    
        if (req.session.userInSession){
            res.locals.userIsLogged = true;
            res.locals.UserLogged = req.session.userInSession[0].dataValues;
        }
        next();
    }catch(e){
        return next();
    }
    
    
};

module.exports = userLoggedMiddleware;