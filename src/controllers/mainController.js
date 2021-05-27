const path = require ('path');
const fs = require ('fs')


// Leer el archivo de usuarios registrados y transformarlo en objeto literal
let productos = JSON.parse(fs.readFileSync('./src/data/productos.json', {encoding: 'utf-8'}));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

let mainController = {
    index: (req,res) => {
        let productos = JSON.parse(fs.readFileSync('./src/data/productos.json', {encoding: 'utf-8'}));
        let productosUltimasVisitas = productos.filter((producto)=>{return producto.category == "visited"});
        let productosOfertas = productos.filter((producto)=>{return producto.category == "in-sale"});
        res.render('home.ejs', {productosUltimasVisitas,productosOfertas,toThousand});
    },
}

module.exports = mainController;

