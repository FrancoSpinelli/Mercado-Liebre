const path = require ('path');
const fs = require ('fs')
const Products = require('../models/Products');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

let mainController = {
    index: (req,res) => {
        let products = Products.readDataBase()
        let productosUltimasVisitas = products.filter((product)=>{return product.category == "visited"});
        let productosOfertas = products.filter((product)=>{return product.category == "in-sale"});
        res.render('home.ejs', {productosUltimasVisitas,productosOfertas,toThousand});
    },

    
}

module.exports = mainController;

