const path = require ('path');
const fs = require ('fs');
const db = require('../database/models');


const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

let productController = { 
    list: (req,res) => {
        let visitedPromise = db.Products.findAll({
            where: {
                category: 'visited',
            },
        });
        let inSalePromise = db.Products.findAll({
            where:{
                category: 'in-sale',
            },
        });
        Promise.all([visitedPromise, inSalePromise])
            .then(function([productsVisited, productsInSale]){
                res.render('home', {productsVisited, productsInSale, toThousand});
        });
    },
    create:(req,res) => {
        res.render('productCreateForm');
    },
    storage:(req,res) => {
        let image = 'default.jpg';
        if (req.file) {
            image = req.file.filename; 
        };
        db.Products.create({
            ...req.body,
            image: image,
        }).then(() => res.redirect('/products/'));
    },
    detail: (req,res) => {
        db.Products.findByPk(req.params.id)
            .then(product => res.render('detailProducts', {product, toThousand}));
    },
    edit: (req,res) => {
        db.Products.findByPk(req.params.id)
            .then(product => res.render('productEditForm', {product}));
    },
    update: (req,res) =>{
        db.Products.update({
            ...req.body,
        },
        {
            where: {id: req.params.id},
        }).then(() => res.redirect(`/products/detail/${req.params.id}`))
    },
    delete: (req,res)=>{
        db.Products.destroy({
            where: {id: req.params.id},
        }).then(res.redirect('/'));
    },
};

module.exports = productController;
