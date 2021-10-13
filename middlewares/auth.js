const jwt = require('jsonwebtoken');
const User = require('../models/users');
const secret = 'my-Own-Secret';

//authenticate user
const authenticateUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            if (err) {
               return res.status(500).json({message: 'You are not authenticated'});
            } else {
                next()
            }
        })
    } else {
        return res.status(500).json({message: 'Please login first'});
    }
};

//protect routes using requireLogin middleware & display current user
const requireLogin = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, secret, async (err, decodedToken) => {
            if (err) {
                 res.locals.user = null;
                next()
            } else {
                const user = await User.findById(decodedToken.id);
                   res.locals.user = user
                next()
            }
        })
    } else {
           res.locals.user = null;
        next()
    }
};


module.exports = { authenticateUser, requireLogin };
