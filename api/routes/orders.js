const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/order');
const Product = require('../models/product');

//Handle incoming GET requests to /order
router.get('/', (req, res, nexr) => {
    Order.find()
        .select('_id product quantity')
        .populate('product', 'name') // if we have relation, this method return not id but full raw info, se-
        .exec()                     // cond paramether select only column witch represent
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                orders: docs.map(doc => {
                    return {
                        _id: doc._id,
                        product: doc.product,
                        quantity: doc.quantity,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/orders/' + doc._id
                        }

                    }
                }),
                

            });
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.post('/', (req, res, nexr) => {
    Product.findById(req.body.productId)
        .then(product => {
            if(!product) {
                return res.status(404).json({
                    message: 'Product not found!'
                });
            }
            const order = new Order({
                _id: mongoose.Types.ObjectId(),
                quantity: req.body.quantity,
                product: req.body.productId
            });
        
            return order.save()
        })
        .then(result => {    
            res.status(201).json({
                message: 'order stored!',
                createdOrder: {
                    _id: result._id,
                    productId: result.product,
                    quantity: result.quantity,
                },
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/orders/' + result._id
                }
            });
        }).catch(err => {
            console.log(err);
    
            res.status(500).json({error: err});
        });
});

router.get('/:orderId', (req, res, nexr) => {
    Order.findById(req.params.orderId)
        .populate('product')
        .exec()
        .then(order => {
            if(!order) {
                return res.status(404).json({ 
                    message: 'Order not found!'
                });
            }

            res.status(200).json({
                order: order,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/orders/'
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err,
            });
        });
});

router.delete('/:orderId', (req, res, nexr) => {
    Order.remove({_id: req.params.orderId})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Order deleted!',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/orders/',
                    body: {
                        productID: "ID",
                        quantity: 'Number'
                    }
                }
            });
        })
        .catch(err => {});
});

module.exports = router;