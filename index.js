const express = require('express');
const bodyParser = require('body-parser');
const Product = require('./models/Product');
const path = require('path');
const sequelize = require('./utils/db');
const adminRoutes = require('./routes/admin');
const addProductsRoutes = require('./routes/add-product');

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs')
app.set('views', 'views')

// test data (book)
const initializeData = async () => {
    await sequelize.sync();
    const productCount = await Product.count();
    if (productCount === 0) {
        await Product.bulkCreate([
           {
                title: 'A Book',
                imageUrl: 'https://www.publicdomainpictures.net/pictures/10000/velka/1-1210009435EGmE.jpg',
                description: 'This is an awesome book!',
                price: 19.99
           } 
        ]);
    } 
}; 

initializeData();

app.get('/shop', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.render('shop', {products});
    } catch (error) {
        res.render('error', {message: 'Could not retrieve products'});
    } 
});

app.get('/admin-products', async (req, res) => {
    try {
        res.render('admin-products');
    } catch (error) {
        res.render('error', {message: 'Failed to load'});
    } 
});

const renderError = (req, res) => {
    res.render('error', {message: 'Page not found or not implemented'})
} 

app.get('/add-products', async (req, res) => {
    try {
        res.render('add-products');
    } catch (error) {
        res.render('error', {message: 'Failed to load'})
    } 
});

app.get('/products', renderError)
app.get('/cart', renderError)
app.get('/add-products', renderError)

app.listen(3042, () => {
    console.log('Server is connected')
})