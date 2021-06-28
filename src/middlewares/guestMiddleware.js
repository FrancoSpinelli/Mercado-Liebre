// MIDDLEWARE EN CASO DE QUE EL USUARIO ESTÉ LOGGEADO Y QUIERA ACCEDER A REGISTRO O LOGIN


let guestMiddleware = function(req, res, next){
    if (req.session.userInSession){
        return res.redirect(`/users/detail/${req.session.userInSession[0].userName}`);
    }
    next();
};

module.exports = guestMiddleware;
