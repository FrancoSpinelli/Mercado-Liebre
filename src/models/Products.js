const path = require ('path');
const fs = require ('fs');

let Products = {
    fileName: path.join(__dirname, '../data/products.json'),

    readDataBase: function(){
        let products = fs.readFileSync(this.fileName, 'utf-8');
        products = JSON.parse(products);
        return products
    },

    writeDataBase: function(data){
        let products = JSON.stringify(data, null, 4);
        return fs.writeFileSync(this.fileName, products);
    },

    generateID: function(){
        let products = Products.readDataBase();
        let ultimo = 0;
        products.forEach(product => {
            if (ultimo < product.id) {
                ultimo = product.id;
            };
        });
        return ultimo + 1;
    },

    findByPk: function(id){
        let products = Products.readDataBase();
        let productFound = products.find(product => product.id == id);
        return productFound;
    },

    create: function(newProduct){
        let products = Products.readDataBase();
        products.push(newProduct);
        this.writeDataBase(products);
    },

    delete: function(id){
        let products = Products.readDataBase();
        products = products.filter ((product)=>{return product.id != id});
        Products.writeDataBase(products);
    },

    edit: function(id, productUpdate){
        let products = Products.readDataBase()
        products = products.filter(product => product.id != id);
        products.push(productUpdate);
        this.writeDataBase(products);
    }


}


module.exports = Products;