const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('web_shop', 'root', 'qwerty', {
    host: 'localhost',
    dialect: 'mysql'
});

const Product = require('../models/Product')(sequelize, Sequelize.DataTypes);
const Cart = require('../models/Cart')(sequelize, Sequelize.DataTypes);
const CartItem = require('../models/CartItem')(sequelize, Sequelize.DataTypes);

Product.belongsToMany(Cart, { through: CartItem, foreignKey: 'productId' });
Cart.belongsToMany(Product, { through: CartItem, foreignKey: 'cartId' });

const syncModels = async () => {
    try {
        await sequelize.sync({ alter: true }); 
        console.log("Database & tables synchronized!");
    } catch (error) {
        console.error("Error syncing models:", error);
    }
};

syncModels();

module.exports = sequelize;