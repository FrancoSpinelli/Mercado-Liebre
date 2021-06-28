module.exports = (sequelize, DataTypes) => {
    let alias = 'Users'
    let cols= {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
        },
        userName: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
        },
        birthday: {
            type: DataTypes.DATE,
        },
        address: {
            type: DataTypes.STRING,
        },
        venderComprar: {
            type: DataTypes.STRING,
        },
        electro: {
            type: DataTypes.BOOLEAN,
        },
        moda: {
            type: DataTypes.BOOLEAN,
        },
        hogar: {
            type: DataTypes.BOOLEAN,
        },
        jugueteria: {
            type: DataTypes.BOOLEAN,
        },
        vida_sana: {
            type: DataTypes.BOOLEAN,
        },
        pass: {
            type: DataTypes.STRING,
        },
        passRepeat: {
            type: DataTypes.STRING,
        },
        image: {
            type: DataTypes.STRING,
        },
    };
    let config = {
        tableName: 'users',
        timestamps: false,
    };
    const User = sequelize.define(alias, cols, config);

    User.associate = models => {
        User.hasMany(models.Products, {
            as: 'user',
            foreignKey: 'user_id',
        });
    };
    
    return User;
}