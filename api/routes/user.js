const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const User = require('../models/user');

router.post('/signup', (req, res, next) => {
    const emailRes = req.body.email;
    User.find({ email: emailRes })
        .exec()
        .then(user => {
            if(user.length >= 1) {
                return res.status(422).json({
                    message: 'User with this ' + emailRes + ' mail has already exist!',
                    status: 422
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if(err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash,
                        });
            
                        user.save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: 'User created!'
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            });
            
                    }
                })
            }
        })
        .catch();
});

router.post('/login', (req, res, next) => {

    // Find user
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            // Check if user exist
            if(user.length < 1) {
                return res.status(401).json({
                    message: 'Auth failed!',
                    status: 401
                });
            }

            // If exist, compare password
            bcrypt.compare(req.body.password, user[0].password, function(err, isLogedIn) {
                if(err) {
                    return res.status(401).json({
                        message: 'Auth failed!',
                        status: 401
                    });
                }
                // If password equals true
                if(isLogedIn) {
                    //Create JWT Token
                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id
                    }, 
                    "secret",
                    {
                        expiresIn: '1h'
                    });

                    return res.status(200).json({
                        message: 'Auth successfully!',
                        status: 200,
                        token: token
                    });
                } else { // If password equals false
                    return res.status(401).json({
                        message: 'Auth failed!',
                        status: 401
                    });
                }
            });

        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

router.delete('/:userId', (req, res, next) => {
    User.deleteOne({ _id: req.params.userId})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'User has been deleted!',
                status: 200
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;