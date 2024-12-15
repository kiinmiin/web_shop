const express = require('express');
const Product = require('../models/Product')(require('../utils/db'));
const router = express.Router();

router.get('/admin-products', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.render('admin-products', { products });
    } catch (error) {
        res.render('error', { message: 'Could not retrieve products' });
    }
});

router.post('/add-product', async (req, res) => {
    const { title, imageUrl, description, price } = req.body;
    try {
        await Product.create({ title, imageUrl, description, price });
        res.redirect('/admin-products');
    } catch (error) {
        res.render('error', { message: 'Could not add product' });
    }
});

router.get('/edit-product/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).render('error', { message: 'Product not found' });
        }
        res.render('edit-product', { product }); 
    } catch (error) {
        console.error("Error fetching product for edit:", error);
        res.render('error', { message: 'Could not fetch product for editing' });
    }
});

router.post('/update-product', async (req, res) => {
    try {
        const { id, title, imageUrl, description, price } = req.body;
        await Product.update(
            { title, imageUrl, description, price },
            { where: { id } }
        );
        res.redirect('/shop'); 
    } catch (error) {
        console.error("Error updating product:", error);
        res.render('error', { message: 'Could not update product' });
    }
});

router.post('/delete-product/:id', async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await Product.findByPk(productId);
        if (product) {
            await product.destroy();
            res.redirect('/admin-products');
        } else {
            res.render('error', { message: 'Product not found' });
        }
    } catch (error) {
        res.render('error', { message: 'Could not delete product' });
    }
});

module.exports = router;