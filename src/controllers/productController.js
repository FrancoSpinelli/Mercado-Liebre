const path = require ('path');
const fs = require ('fs');
const data = require('../utils/dataAccessModel');


let productos = data.readJSON('productos.json');

// const readJSON = (archivo)=>{
//     let productos = JSON.parse(fs.readFileSync(`./src/data/${archivo}`, {encoding: 'utf-8'}));
//     return productos
// };

// const writeJSON = (archivo, variable)=>{
//     fs.writeFileSync(`./src/data/${archivo}`, JSON.stringify(variable));
// }

// let productos = readJSON('productos.json');


const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

let mainController = {
    list: (req,res) => {
        let productos = data.readJSON('productos.json');
        let productosUltimasVisitas = productos.filter((producto)=>{return producto.category == "visited"});
        let productosOfertas = productos.filter((producto)=>{return producto.category == "in-sale"});
        res.render('home.ejs', {productosUltimasVisitas,productosOfertas,toThousand});
    },
    detail: (req,res) => {
        let productos = data.readJSON('productos.json');
        let idURL = req.params.id;
        let productoSeleccionado = productos.filter((producto)=>{return producto.id == idURL})
        res.render('detailProducts',{productoSeleccionado,toThousand});
    },
    delete: (req,res)=>{
        let idURL = req.params.id;
        let productosActualizados = productos.filter ((producto)=>{return producto.id != idURL});
        data.writeJSON('productos.json', productosActualizados);
        res.redirect('/');
    },
    edit: (req,res) => {
        let idURL = req.params.id;
        let productoSeleccionado = productos.filter((producto)=>{return producto.id == idURL});
        res.render('product-edit-form', {productoSeleccionado});
    },
    update: (req,res) =>{
        let idURL = req.params.id;
        let productoSeleccionado = productos.filter((producto)=>{return producto.id == idURL});
        let productosActualizados = productos.filter((producto)=>{return producto.id != idURL});
        let productoActualizado = {
            id: idURL,
            name: req.body.name,
            price: req.body.price,
            discount: req.body.discount,
            description: req.body.description,
            category: req.body.category,
            image: productoSeleccionado[0].image,
        };
        productosActualizados.push(productoActualizado);
        data.writeJSON('productos.json', productosActualizados);
        res.redirect('/products/detail/' + idURL);
    },
    create:(req,res) => {
        res.render('product-create-form');
    },
    storage:(req,res) => {
        if (req.file){
            let productoNuevo = {
                id: data.lastID('productos.json'),
                ...req.body,
                image: req.file.filename,
            };
            if (productos === ""){
                productos = [];
            } else {
                productos.push(productoNuevo)
            };
            data.writeJSON('productos.json', productos);
            res.redirect('/');
        } else {
            res.render('product-create-form');
        }
    }
    
};

module.exports = mainController;
