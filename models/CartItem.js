const {DataTypes} = require('sequelize') 

const CartItem = (sequelize) => {
    const CartItemModel = sequelize.define('CartItem', { 
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: true, 
        },
        cartId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'Carts',
                key: 'id',
            }  
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'products',
                key: 'id'
            }  
        },
    }, {
        tableName: 'cartItems', 
        timestamps: false,
    });
    CartItemModel.associate = (models) => {
        CartItemModel.belongsTo(models.Cart, {foreignKey: 'cartId'})
        CartItemModel.belongsTo(models.Product, {foreignKey: 'productId'})
    }
    return CartItemModel; 
};

module.exports = CartItem;