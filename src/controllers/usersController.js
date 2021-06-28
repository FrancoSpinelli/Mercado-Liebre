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
                        console.log('4');
                        
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
        db.Users.findAll({
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
            let passChecked = bscryptjs.compareSync(req.body.pass, userFound[0].pass);
            if (!passChecked){
                return res.render('login', { 
                    old: req.body.userName,
                    errors: {
                        userName: {
                            msg: 'Verificar usuario y/o contraseña'
                        }
                    }
                });
            };
            delete userFound.pass;
            delete userFound.passRepeat;
            req.session.userInSession = userFound;
            if (req.body.remember_user) {
                res.cookie('userNameLogged', req.body.userName, { maxAge: (1000 * 60 * 30)});
            }
            return res.redirect(`detail/${userFound[0].userName}`);
        });
    },
    detail: (req,res)=>{
        db.Users.findAll({
            where: {userName: req.params.userName},
        }).then(function(userFound){
            userLogged = userFound
            return res.render ('detail.ejs', {userFound, userLogged})
        })
        
    },

    edit: (req, res)=>{
        db.Users.findAll({
            where: {userName: req.params.userName},
        }).then(function(userToEdit){
            return res.render ('editUser.ejs', {userToEdit})
        })
    },

//     processEdit: (req,res)=>{
//         let userNameURL = req.params.userName;
//         let userToEdit = User.findUserName(userNameURL)
//         let image = null;
//         if (req.file) {
//             image = req.file.filename
//         } else {
//             image = userToEdit.image;
//         }
//         let userUpdate = {
//             ...userToEdit,
//             ...req.body,
//             image: image
//         };
//         User.edit(userNameURL, userUpdate);
//         return res.render (`detail`, {userFound:userUpdate, userLogged: req.session.userInSession });
//     },
    
//     delete: (req, res) => {
//         let userNameURL = req.params.userName;
//         User.delete(userNameURL);
//         return res.redirect('/users/list');
//     },
    
    logout: (req, res) =>{
        res.clearCookie('userNameLogged')
        req.session.destroy();
        res.redirect('/');
    }
}


module.exports = usersController;




