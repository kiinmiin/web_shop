const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.send('<b> Web Shop Page</b>');
});

module.exports = router;