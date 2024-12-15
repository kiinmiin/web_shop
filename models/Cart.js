const  {DataTypes} = require('sequelize') 

const Cart = (sequelize) => {
    const CartModel = sequelize.define('Cart', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
    }, {
        tableName: 'Carts',
        timestamps: false,
    });
    CartModel.associate = (models) => {
        CartModel.hasMany(models.CartItem, {foreignKey: 'cartId'})
    }
    return CartModel; 
};

module.exports = Cart;