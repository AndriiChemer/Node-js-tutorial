const express = require('express');
const router = express.Router();

//Handle incoming GET requests to /order
router.get('/', (req, res, nexr) => {
    res.status(200).json({
        message: 'Orders where fetched'
    });
});

router.post('/', (req, res, nexr) => {
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    };
    res.status(201).json({
        message: 'Orders was created',
        order: order
    });
});

router.get('/:orderId', (req, res, nexr) => {
    res.status(200).json({
        message: 'Orders details',
        orderId: req.params.orderId
    });
});

router.delete('/:orderId', (req, res, nexr) => {
    res.status(200).json({
        message: 'Orders deleted',
        orderId: req.params.orderId
    });
});

module.exports = router;