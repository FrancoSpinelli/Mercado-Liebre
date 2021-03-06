module.exports = (sequelize, DataTypes) => {
    let alias = 'Products'
    let cols= {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
        },
        price: {
            type: DataTypes.INTEGER,
        },
        discount: {
            type: DataTypes.INTEGER,
        },
        category: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
        },
        image: {
            type: DataTypes.STRING,
        },
        user_id: {
            type: DataTypes.INTEGER,
        },
    };
    let config = {
        tableName: 'products',
        timestamps: false,
    };
    const Product = sequelize.define(alias, cols, config);
    return Product;
}