const {validationResult} = require('express-validator');
const bscryptjs = require ('bcryptjs');
const data = require('../utils/dataAccessModel');
const User = require('../models/User');


let usersController = {
    list: (req,res) => {
        let users = User.users();
        res.render('list.ejs', {users})
    },

    register: (req,res) => {
        res.render('register.ejs')
    },

    processRegister: (req, res) => {
        let errorsValidations = validationResult(req);
        if (errorsValidations.length > 0) {
            return res.render('register', {errors: errorsValidations.mapped(), old: req.body})
        } else {
            let data = req.body;
            let newUser = {
                id: User.generateID(),
                ...data,
                pass: bscryptjs.hashSync(data.pass, 10),
                fotoPerfil: req.file.filename,
            };
            User.create(newUser);
            return res.redirect ('/users/list');
        }  
    },

    login: (req,res) => {
        res.render('login.ejs')
    },

    processLogin: (req, res) =>{
        let userNameBody = req.body.userName;
        let userFound = User.findUserName(userNameBody);
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
                    }
                }
            });
        };
        delete userFound.pass;
        delete userFound.passRepeat;
        req.session.userInSession = userFound;
        return res.redirect(`detail/${userFound.userName}`);
    },

    detail: (req,res)=>{
        let userLogged = req.session.userInSession;
        let userNameURL = req.params.userName;
        let userFound = User.findUserName(userNameURL);
        res.render ('detail.ejs', {userFound, userLogged});
    },

    edit: (req, res)=>{
        let userNameURL = req.params.userName;
        let userToEdit = User.findUserName(userNameURL);
        res.render ('editUser', {userToEdit});
    },

    processEdit: (req,res)=>{
        let userNameURL = req.params.userName;
        let userToEdit = User.findUserName(userNameURL)
        let userUpdate = {
            ...userToEdit,
            ...req.body,
            fotoPerfil: req.file.filename
        };
        User.edit(userNameURL, userUpdate);
        return res.render (`detail`, {userFound:userUpdate, userLogged: req.session.userInSession });
    },
    
    delete: (req, res) => {
        let userNameURL = req.params.userName;
        User.delete(userNameURL);
        return res.redirect('/users/list');
    }
}


module.exports = usersController;




