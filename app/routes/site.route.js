
const express = require('express');

const router = express.Router();

// / -> root
router.route('/')
    .get((req, res, next) => {
        res.json({
            message: 'Welcome to borrow book application.',
        });
    });


module.exports = router;
