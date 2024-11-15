const express = require('express');
const lehekylg = require('./views/index.html')

const router = express.Router();

router.get('/', (req, res, next) => {
    res.send(lehekylg);
});

module.exports = router;