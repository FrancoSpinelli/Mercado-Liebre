const path = require ('path');
const fs = require ('fs')


// Leer el archivo de usuarios registrados y transformarlo en objeto literal
let productos = JSON.parse(fs.readFileSync('./src/data/productos.json', {encoding: 'utf-8'}));

let mainController = {
    index: (req,res) => {
        let productosUltimasVisitas = productos.filter((producto)=>{return producto.category == "visited"});
        let productosOfertas = productos.filter((producto)=>{return producto.category == "in-sale"});
        res.render('home.ejs', {productosUltimasVisitas,productosOfertas});
    },
}

module.exports = mainController;

