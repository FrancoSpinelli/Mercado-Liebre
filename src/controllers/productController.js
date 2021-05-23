const path = require ('path');
const fs = require ('fs');

// Leer el archivo de usuarios registrados y transformarlo en objeto literal
let productos = JSON.parse(fs.readFileSync('./src/data/productos.json', {encoding: 'utf-8'}));

let mainController = {
    list: (req,res) => {
        let productosUltimasVisitas = productos.filter((producto)=>{return producto.category == "visited"});
        let productosOfertas = productos.filter((producto)=>{return producto.category == "in-sale"});
        res.render('home.ejs', {productosUltimasVisitas,productosOfertas});
    },
    detail: (req,res) => {
        let idURL = req.params.id;
        let productoSeleccionado = productos.filter((producto)=>{return producto.id == idURL})
        res.render('detailProducts',{productoSeleccionado});
    },
    edit: (req,res) => {
        let idURL = req.params.id;
        let productoSeleccionado = productos.filter((producto)=>{return producto.id == idURL});
        res.render('product-edit-form', {productoSeleccionado});
    },
    update: (req,res) =>{
        res.send('Producto actualizado');
    },
    create:(req,res) => {
        res.render('product-create-form');
    },
    storage:(req,res) => {
        let ultimaID = productos.length;
        if (req.file){
            let productoNuevo = {
                id: ultimaID +1,
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                discount: req.body.discount,
                image: req.file.filename,
                category: req.body.category,
            };
            if (productos === ""){
                productos = [];
            } else {
                productos.push(productoNuevo)
            };
            productos = JSON.stringify(productos);
            fs.writeFileSync('./src/data/productos.json',productos);
            res.redirect('/');
        } else {
            res.render('product-create-form');
        }
    }
    
};

module.exports = mainController;
