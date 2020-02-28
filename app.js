const express = require('express');
const app = express();
const morgan = require('morgan');

const produstRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders')

app.use(morgan('dev'));

//Routes which should handle requests
app.use('/products', produstRoutes);
app.use('/order', orderRoutes);

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