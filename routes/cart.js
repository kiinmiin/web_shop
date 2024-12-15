const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart')(require('../utils/db')); 
const CartItem = require('../models/CartItem')(require('../utils/db')); 
const Product = require('../models/Product')(require('../utils/db'));


router.get('/', async (req, res) => {
    try {
        const cart = await Cart.findOne({
            where: { id: cartId }, 
            include: [{
                model: CartItem,
            }] 
        });
        res.render('cart', { cart }); 
    } catch (error) {
        console.error("Error loading cart:", error);
        res.render('error', { message: 'Could not load cart' });
    }
});

module.exports = router;