const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const produstRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders')

var connectionUrl = 'mongodb+srv://node-shop:' + 
    process.env.MONGO_ATLAS_PW + 
    '@node-rest-shop-ikat2.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(
    connectionUrl, 
    { useNewUrlParser: true, useUnifiedTopology: true }
);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT', 'POST', 'PATCH', 'DELETE', 'GET');
        return res.status(200).json({});
    }
    next();
});

//Routes which should handle requests
app.use('/products', produstRoutes);
app.use('/orders', orderRoutes);

//Handle all errorы
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
            status: error.status
        }
    });
});



module.exports = app;