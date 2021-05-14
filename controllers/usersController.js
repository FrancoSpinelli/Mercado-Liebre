const path = require ('path');
const fs = require ('fs')

// Leer el archivo de usuarios registrados y transformarlo en objeto literal
let usuariosRegistrados = JSON.parse(fs.readFileSync('usuariosRegistrados.json', {encoding: 'utf-8'}));



let usersController = {
    list: (req,res) => {
        res.render('list.ejs', {usuariosRegistrados: usuariosRegistrados})
    },

    detail: (req,res)=>{
        let usuarioSeleccionadoURL = req.params.userName;
        let usuarioSeleccionado = usuariosRegistrados.filter((usuario)=>{
            return usuario.userName == usuarioSeleccionadoURL
            
        })
        console.log(usuarioSeleccionado);
        res.render ('detail.ejs', {usuarioSeleccionado: usuarioSeleccionado});
    },

    edit: (req, res)=>{
        res.send('Hola')
    },
    // search: (req,res)=>{
    //     let buscadoPorElUsuario = req.query.searcher;
    //     let usuariosResultante =[];
    //     for (let i = 0; usuariosRegistrados.length; i++){
    //         if (usuariosRegistrados[i].nameUser.includes(buscadoPorElUsuario)){
    //             usuariosResultante.push(usuariosRegistrados[i]);
    //         }
    //     }
    //     res.render('list',{usuariosResultante: usuariosResultante})
    // },
    register: (req,res) => {
        res.render('register.ejs')
    },

    login: (req,res) => {
        res.render('login.ejs')
    },

    create: (req,res)=>{
        let usuarioNuevo = req.body;
    
        // Leer archivo de usuarios
        let archivoUsuarios = fs.readFileSync('usuariosRegistrados.json', {encoding: 'utf-8'});

        // Si no tiene información crear un array vacio, si ya tiene trnsformarla en objeto literal
        if (archivoUsuarios == ""){
            usuariosRegistrados = [];
        } else {
            usuariosRegistrados = JSON.parse(archivoUsuarios)
        }

        // Agregar el nuevo usuario al array
        usuariosRegistrados.push(usuarioNuevo);

        // Actualizar y guardar el archivo en formato JSON
        fs.writeFileSync('usuariosRegistrados.json', JSON.stringify(usuariosRegistrados))

        // Redireccionar
        res.redirect ('/users/list')
    }

}

module.exports = usersController;




