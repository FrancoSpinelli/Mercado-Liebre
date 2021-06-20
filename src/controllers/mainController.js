const path = require ('path');
const fs = require ('fs')
const Products = require('../models/Products');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

let mainController = {
    index: (req,res) => {
        // let visitedPromise = db.Producto.findAll({
        //     where: {
        //         category: 'visited'
        //     }
        // }).then(productosUltimasVisitas=> productosUltimasVisitas);
        // let inSalePromise = db.Producto.findAll({
        //     where:{
        //         category: 'in-sale'
        //     }
        // }).then(productosOfertas=> productosOfertas);
        
        // Promise.all([visitedPromise, inSalePromise])
        //     .then(resultado=>res.send(resultado))
        // db.Producto.findAll()
        // .then(products=>{
        //     let productosUltimasVisitas = products.filter((product)=>{return product.category == "visited"});
        //     let productosOfertas = products.filter((product)=>{return product.category == "in-sale"});
        //     res.render('home.ejs', {productosUltimasVisitas,productosOfertas,toThousand})
        // })
         let products = Products.readDataBase()
         let productosUltimasVisitas = products.filter((product)=>{return product.category == "visited"});
         let productosOfertas = products.filter((product)=>{return product.category == "in-sale"});
         res.render('home.ejs', {productosUltimasVisitas,productosOfertas,toThousand});
    },
    

    
}

module.exports = mainController;

