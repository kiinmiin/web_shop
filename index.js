const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sequelize = require('./utils/db');
const Product = require('./models/Product')(sequelize); 
const Cart = require('./models/Cart')(sequelize); 
const CartItem = require('./models/CartItem')(sequelize); 
const adminRoutes = require('./routes/admin'); 
const cartRoutes = require('./routes/cart'); 
const shopRoutes = require('./routes/shop'); 

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', 'views');

Cart.associate({ CartItem, Product });
CartItem.associate({ Cart, Product });
Product.associate = (models) => {
    Product.hasMany(models.CartItem, { foreignKey: 'productId' });
};

console.log(Cart.associations)
console.log(CartItem.associations)
console.log(Product.associations)

const initializeData = async () => {
    try {
        await sequelize.sync();
        console.log("Database & tables synchronized!");
    } catch (error) {
        console.error("Error synchronizing the database:", error);
    }
};

initializeData();

app.use('/shop', shopRoutes);
app.use('/admin', adminRoutes);
app.use('/cart', cartRoutes);

app.get('/products', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.render('shop', { products }); 
    } catch (error) {
        console.error("Error retrieving products:", error);
        res.render('error', { message: 'Could not retrieve products' });
    }
});

app.get('/add-products', (req, res) => {
    res.render('add-products');
});

app.get('/admin-products', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.render('admin-products', { products });
    } catch (error) {
        console.error("Error retrieving products:", error);
        res.render('error', { message: 'Could not retrieve products' });
    }
});

app.use((req, res) => {
    res.render('error', { message: 'Page not found or not implemented' });
});



app.listen(3042, () => {
    console.log(`Server is connected`);
});