const path = require ('path');
const fs = require ('fs');
const Products = require('../models/Products');


const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

let productController = {
    
    list: (req,res) => {
        let products = Products.readDataBase()
        let productosUltimasVisitas = products.filter((product)=>{return product.category == "visited"});
        let productosOfertas = products.filter((product)=>{return product.category == "in-sale"});
        res.render('home.ejs', {productosUltimasVisitas,productosOfertas,toThousand});
    },
    
    detail: (req,res) => {
        let products = Products.readDataBase();
        let idURL = req.params.id;
        let productSelected = Products.findByPk(idURL);
        res.render('detailProducts.ejs', {productSelected,toThousand});
    },

    delete: (req,res)=>{
        let idURL = req.params.id;
        Products.delete(idURL);
        res.redirect('/products/list');
    },

    edit: (req,res) => {
        let idURL = req.params.id;
        let productSelected = Products.findByPk(idURL);
        res.render('product-edit-form', {productSelected});
    },

    update: (req,res) =>{
        let idURL = req.params.id;
        productSelected = Products.findByPk(idURL);
        productUpdate = {
            id: idURL,
            ...req.body,
            image: productSelected.image
        };
        Products.edit(idURL, productUpdate);
        return res.redirect(`/products/detail/${idURL}`);
    },

    create:(req,res) => {
        res.render('product-create-form');
    },

    storage:(req,res) => {
        let image = 'default.jpg';
        if (req.file) {
            image = req.file.filename; 
        };
        let newProduct = {
            id: Products.generateID,
            ...req.body,
            image: image,
        };
        Products.create(newProduct);
        return res.redirect('/');
    }
    
};

module.exports = productController;
