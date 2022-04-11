const {validationResult} = require('express-validator');
const bscryptjs = require ('bcryptjs');
const db = require('../database/models');



let usersController = {
    list: (req,res) => {
        db.Users.findAll()
            .then(users => res.render('userList', {users}));
    },
    register: (req,res) => {
        res.render('register.ejs')
    },
    processRegister: (req, res) => {
        let image = 'default.jpg';
        let errorsValidations = validationResult(req);
        if (errorsValidations.errors.length > 0) {
            return res.render('register', {errors: errorsValidations.mapped(), old: req.body});
        };
        db.Users.findAll({
            where: {userName: req.body.userName},
        }).then(function(userNameCheck){
            if (userNameCheck.length > 0){
                return res.render('register', { 
                    old: req.body,
                    errors: {
                        userName: {
                            msg: 'El nombre de usuario no está disponible',
                        },
                    },
                });
            } else {
                if (req.body.pass !== req.body.passRepeat){
                    return res.render('register', { 
                        old: req.body,
                        errors: {
                            pass: {
                                msg: 'Las contraseñas no coinciden',
                            },
                        },
                    });
                } else {
                    if (req.file) {
                        image = req.file.filename;
                        
                    };
                };
                db.Users.create({
                    ...req.body,
                    pass: bscryptjs.hashSync(req.body.pass, 10),
                    passRepeat: bscryptjs.hashSync(req.body.passRepeat, 10),
                    image: image,
                }).then(() => res.redirect('/users/list'));
            };
        });
    },
    login: (req,res) => {
        res.render('login.ejs')
    },

    processLogin: (req, res) =>{
        db.Users.findOne({
            where: {userName: req.body.userName},
        }).then(function(userFound){
            if (!userFound) {
                return res.render('login', { 
                    old: req.body.userName,
                    errors: {
                        userName: {
                            msg: 'Verificar usuario y/o contraseña'
                        }
                    }
                });
            };
            let passChecked = bscryptjs.compareSync(req.body.pass, userFound.pass);
            if (!passChecked){
                return res.render('login', { 
                    old: req.body.userName,
                    errors: {
                        userName: {
                            msg: 'Verificar usuario y/o contraseña'
                        },
                    },
                });
            };
            delete userFound.dataValues.pass;
            delete userFound.dataValues.passRepeat;
            req.session.userInSession = userFound.dataValues;
            if (req.body.remember_user) {
                res.cookie('userNameLogged', req.body.userName, { maxAge: (1000 * 60 * 30)});
            }
            return res.redirect(`detail/${userFound.dataValues.userName}`);
        });
    },
    detail: (req,res)=>{
        let userLogged
        db.Users.findAll({
            where: {userName: req.params.userName},
        }).then(function(userFound){
            userLogged = userFound
            return res.render ('detail.ejs', {userFound: userFound[0].dataValues, userLogged})
        })
        
    },

    edit: (req, res)=>{
        db.Users.findAll({
            where: {userName: req.params.userName},
        }).then(function(userToEdit){
            return res.render ('editUser.ejs', {userToEdit})
        })
    },

    processEdit: (req,res)=>{
        db.Users.findAll({
            where: {userName: req.params.userName},
        }).then(function(userToEdit){
            if (req.file) {
                image = req.file.filename
            } else {
                image = userToEdit.image;
            }
            db.Users.update({
                ...userToEdit,
                ...req.body,
                image: image
            },
            {
                where: {userName: req.params.userName}
            })
            return userToEdit
        }).then (()=> res.redirect(`/users/detail/${req.params.userName}`))
        
    },
    
    delete: (req, res) => {
        db.Users.destroy({
            where: {userName: req.params.userName}
        }).then(()=> res.redirect('/users/list'))
    },
    
    logout: (req, res) =>{
        res.clearCookie('userNameLogged');
        req.session.destroy();
        res.redirect('/');
    }
}


module.exports = usersController;




