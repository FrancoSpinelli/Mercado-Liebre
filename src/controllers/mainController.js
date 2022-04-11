const path = require ('path');
const fs = require ('fs');
const db = require('../database/models');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

let mainController = {
    // index: async (req,res) => {
    //     try {
    //         let productsVisited = await db.Products.findAll({
    //             where: {
    //                 category: 'visited',
    //             },
    //         });
    //         let productsInSale = await db.Products.findAll({
    //             where:{
    //                 category: 'in-sale',
    //             },
    //         });
    //         res.render('home', {productsVisited, productsInSale, toThousand});
    //     } catch (err){
    //         console.log(err);
    //     }
    // },  
    index: (req,res) => {
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
};

module.exports = mainController;

