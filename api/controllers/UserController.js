const config = require('../config');
const User = require('../models/User');
const validator = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Register
module.exports.register = [
    // validator rules
    validator.body('full_name', 'Please enter Full Name').isLength({min: 1}),
    validator.body('email', 'Please enter Email').isLength({min: 1}),
    validator.body('email').custom(value => {
        return User.findOne({email: value}).then(user => {
            if(user !== null) {
                return Promise.reject('Email already in use');
            }
        })
    }),
    validator.body('password', 'Please enter Password').isLength({min: 1}),

    (request, response) => {
        // throw validation errors
        const errors = validator.validationResult(request);
        if(!errors.isEmpty()) {
            return response.status(422).json({errors: errors.mapped()});
        }

        // initialize record
        const user = new User({
            full_name: request.body.full_name,
            email: request.body.email,
            password: request.body.password
        });

        // encrypt password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(user.password, salt);
        user.password = hash;

        // save record
        user.save((error, user) => {
            if(error) {
                return response.status(500).json({
                    message: 'Error saving record',
                    error: error
                });
            } else {
                return response.json({
                    message: 'saved',
                    _id: user._id
                });
            }
        })
    }
];

// Login
module.exports.login = [
    // validation rules
    validator.body('email', 'Please enter Email').isLength({min: 1}),
    validator.body('password', 'Please enter password').isLength({min: 1}),

    (request, response) => {
        // throw validation errors
        const errors = validator.validationResult(request);
        if(!errors.isEmpty()) {
            return response.status(422).json({errors: errors.mapped()});
        }
        
        // validate email and password correct
        User.findOne({email: request.body.email}, (error, user) => {
            if(error) {
                return response.status(500).json({
                    message: 'Error login',
                    error: error
                });
            } else if(user === null) {
                return response.status(500).json({
                    message: 'Email not found'
                });
            } else {
                return bcrypt.compare(request.body.password, user.password, (error, isMatched) => {
                    if(isMatched === true) {
                        return response.json({
                            user: {
                                _id: user._id,
                                email: user.email,
                                full_name: user.full_name
                            },
                            token: jwt.sign({
                                _id: user._id,
                                email: user.email,
                                full_name: user.full_name
                            }, config.authSecret)
                        });
                    } else {
                        return response.status(500).json({
                            message: 'Invalid Email or Password'
                        });
                    }
                })
            }
        })
    }
];

// Get User
module.exports.user = (request, response) => {
    const token = request.headers.authorization;
    if(token) {
        // verify secret and check if the token expired
        jwt.verify(token.replace(/^Bearer\s/, ''), config.authSecret, (error, decode) => {
            if(error) {
                return response.status(401).json({message: 'Unauthorized'});
            } else {
                return response.json({user: decode})
            }
        });
    } else {
        return response.status(401).json({message: 'Unauthorized'});
    }
}