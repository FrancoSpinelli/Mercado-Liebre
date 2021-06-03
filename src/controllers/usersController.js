const path = require ('path');
const fs = require ('fs');
const {validationResult} = require('express-validator');
const bscryptjs = require ('bcryptjs');
const data = require('../utils/dataAccessModel');
const User = require('../models/User');


// let usuariosRegistrados = data.readJSON('usuariosRegistrados.json');


let usersController = {
    list: (req,res) => {
        let users = User.users();
        res.render('list.ejs', {users})
    },

    register: (req,res) => {
        res.render('register.ejs')
    },

    processRegister: (req, res) => {
        let data = req.body;
        let newUser = {
            id: User.generateID(),
            ...data,
            pass: bscryptjs.hashSync(data.pass, 10),
            fotoPerfil: req.file.filename,
        };
        User.create(newUser);
        return res.redirect ('/users/list');
    },

    // processRegister: (req,res)=>{

    //     const errors = validationResult(req);
    //     return console.log(errors.mapped().name, errors.mapped().value, req.body.name);

    //     if (errors.length > 0){
    //         let usuarioNuevo ={
    //             id: data.lastID('usuariosRegistrados.json'),
    //             ...req.body,
    //             fotoPerfil: req.file.filename,
    //             pass: bscryptjs.hashSync(req.body.pass, 10),
    //         }
    //         let archivoUsuarios = data.readJSON('usuariosRegistrados.json')
    //         if (archivoUsuarios == ""){
    //             usuariosRegistrados = [];
    //         } else {
    //             usuariosRegistrados = archivoUsuarios;
    //         }
    //         usuariosRegistrados.push(usuarioNuevo);
    //         data.writeJSON('usuariosRegistrados.json', usuariosRegistrados);
    //         res.redirect ('/users/list');
    //     } else {
    //         // errors.mapped();
    //         let old = req.body;
    //         console.log( errors.mapped() , old);
    //         return res.send(errors)
    //         res.render('register' , {errors , old});
    //     }
    // },

    login: (req,res) => {
        res.render('login.ejs')
    },
    processLogin: (req, res) =>{
        let usuariosRegistrados = data.readJSON('usuariosRegistrados.json');
        for (let i = 0; i < usuariosRegistrados.length; i++) {
            if (req.body.userName == usuariosRegistrados[i].userName && bscryptjs.compareSync(req.body.pass, usuariosRegistrados[i].pass) == true){
                return res.send(`Bienvenido ${usuariosRegistrados[i].userName}`);
            } 
        }
        res.send('Login incorrecto');
    },

    detail: (req,res)=>{
        let userNameURL = req.params.userName;
        let userFound = User.findUserName(userNameURL);
        res.render ('detail.ejs', {userFound});
    },

    edit: (req, res)=>{
        let userNameURL = req.params.userName;
        let userToEdit = User.edit(userNameURL);
        res.render ('editUser', {userToEdit});
    },

    processEdit: (req,res)=>{
        let userNameURL = req.params.userName;
        let userToEdit = User.findUserName(userNameURL)
        let userUpdate = {
            ...userToEdit,
            ...req.body
        };
        User.processEdit(userNameURL, userUpdate);
        return res.redirect ('/users/list');
    },
    
    delete: (req, res) => {
        let userNameURL = req.params.userName;
        User.delete(userNameURL);
        return res.redirect('/users/list');
    }
}


module.exports = usersController;




