// import { response } from "express";
const config = require('../config/config.js');
const jwt = require('jsonwebtoken');
const User = require('../user/userModel.js')

let alterData = (req, res, next) => {
    
    if (!req.body.item) res.status(400).json('no title provided')
    
    let item = req.body.item[0].toUpperCase() + req.body.item.slice(1);
    req.body.item = item;
    next();
}

const authenticate = async (req, res, next) => {
    let token = req.header('x-auth');
    // console.log(token);
    // next()
    let decoded; 
    try {
        decoded = jwt.verify(token, config.password)
        let user = await User.findOne({
            _id: decoded._id,
            "tokens.token": token
        })
        if (user) {
            req.user = user;
            req.token = token;
            next();
        } else {
            res.status(401).json('Not authorized')
        }
    } catch(e) {
        res.status(400).json(e)
    }
}

module.exports = {
    alterData,
    authenticate
};