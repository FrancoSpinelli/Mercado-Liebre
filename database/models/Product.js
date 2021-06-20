module.exports = (sequelize, dataTypes)=>{
let alias = 'Producto';
let cols = {
    id:{
        type: dataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name:{
        type: dataTypes.STRING,
        allowNull: false

    },
    price:{
        type: dataTypes.STRING,
        allowNull: false
    },
    discount:{
        type: dataTypes.INTEGER
    },
    category:{
        type: dataTypes.STRING
    },
    image:{
        type: dataTypes.STRING
    }
};
let config = {
    tableName: 'products',
    timestamps: false
};

const Producto = sequelize.define(alias, cols, config);
return Producto;
};