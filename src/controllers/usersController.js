const path = require ('path');
const fs = require ('fs');
const {validationResult} = require('express-validator');


// Leer el archivo de usuarios registrados y transformarlo en objeto literal
let usuariosRegistrados = JSON.parse(fs.readFileSync('./src/data/usuariosRegistrados.json', {encoding: 'utf-8'}));



let usersController = {
    list: (req,res) => {
        res.render('list.ejs', {usuariosRegistrados: usuariosRegistrados})
    },

    detail: (req,res)=>{
        let usuarioSeleccionadoURL = req.params.userName;
        let usuarioSeleccionado = usuariosRegistrados.filter((usuario)=>{
            return usuario.userName == usuarioSeleccionadoURL
            
        })
        res.render ('detail.ejs', {usuarioSeleccionado: usuarioSeleccionado});
    },

    edit: (req, res)=>{
        let usuarioSeleccionadoURL = req.params.userName;
        let usuarioSeleccionado = usuariosRegistrados.filter((usuario)=>{
            return usuario.userName == usuarioSeleccionadoURL
        })
        res.render ('edit', {usuarioSeleccionado: usuarioSeleccionado})
    },

    save: (req,res)=>{
        let usuariosRegistrados = JSON.parse(fs.readFileSync('./src/data/usuariosRegistrados.json', {encoding:'utf-8'}));
        // let usuarioSeleccionadoURL = req.params.userName;
        // let usuarioAEditar = usuariosRegistrados.filter((usuario)=>{
        //     return usuario.userName == usuarioSeleccionadoURL
        // 
        
        
        // usuarioAEditar = {
        //     name: req.body.name,
        //     userName: usuarioAEditar[0].userName,
        //     email: req.body.email,
        //     birthday: req.body.birthday,
        //     adress: req.body.adress,
        //     venderComprar: usuarioAEditar[0].venderComprar,
        //     electro: usuarioAEditar[0].electro,
        //     hogar: usuarioAEditar[0].hogar,
        //     jugueteria: usuarioAEditar[0].jugueteria,
        //     fotoPerfil: usuarioAEditar[0].fotoPerfil,
        //     pass: usuarioAEditar[0].pass,
        //     passRepeat: usuarioAEditar[0].passRepeat,
        //     terminosCondiciones: usuarioAEditar[0].terminosCondiciones,
        // };
        // console.log(usuarioAEditar)
        res.send ("usuario editado")
    },

    register: (req,res) => {
        res.render('register.ejs')
    },

    login: (req,res) => {
        res.render('login.ejs')
    },

    create: (req,res)=>{

        let errors = validationResult(req);

        if (errors.isEmpty()){
            console.log(`los errores son ${errors}`);
            let usuarioNuevo ={
                name: req.body.name,
                userName: req.body.userName,
                email: req.body.email,
                birthday: req.body.birthday,
                adress: req.body.adress,
                fotoPerfil: req.file.filename,
                venderComprar: req.body.venderComprar,
                electro: req.body.electro,
                moda: req.body.compra,
                hogar: req.body.hogar,
                jugueteria: req.body.jugueteria,
                vidasana: req.body.vidasana,
                pass: req.body.pass,
                passRepeat: req.body.passRepeat,
                newletter: req.body.newletter,
                terminosCondiciones: req.body.terminosCondiciones
            }
        
            // Leer archivo de usuarios
            let archivoUsuarios = fs.readFileSync('./src/data/usuariosRegistrados.json', {encoding: 'utf-8'});
    
            // Si no tiene información crear un array vacio, si ya tiene trnsformarla en objeto literal
            if (archivoUsuarios == ""){
                usuariosRegistrados = [];
            } else {
                usuariosRegistrados = JSON.parse(archivoUsuarios)
            }
    
            // Agregar el nuevo usuario al array
            usuariosRegistrados.push(usuarioNuevo);
    
            // Actualizar y guardar el archivo en formato JSON
            fs.writeFileSync('./src/data/usuariosRegistrados.json', JSON.stringify(usuariosRegistrados))
    
            // Redireccionar
            res.redirect ('/users/list')
        } else {
            console.log(errors.mapped())
            res.render('register' , {errors: errors.mapped(), old: req.body});
        }
    }

};

module.exports = usersController;




