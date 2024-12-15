const express = require('express');
const Product = require('../models/Product')(require('../utils/db'));

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.render('shop', { products });
    } catch (error) {
        console.error("Error retrieving products:", error);
        res.render('error', { message: 'Could not retrieve products' });
    }
});

module.exports = router;