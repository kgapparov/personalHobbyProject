const mongoose = require("mongoose");
const utils = require("../controller/utils");
const util = require("util");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {promise} = require("bcrypt/promises");
require("dotenv").config();


module.exports.addUser=function(req, res) {
    const response = {
        status: 201,
        message: {}
    };
   _addUser(req, res, response);
}



const _addUser = function (req, res, response) {
        console.log(req.body);
        let user = req.body;
        if (utils.checkIfParamsExists(req, "username", "password", "name")) {
            bcrypt.genSalt(process.env.SALT_RAOUND, (err, salt) => _generateSaltAndCallHash(err, salt, req, res, response, user.password, _hashCalback))
        } else {
            response.status = process.env.INVALID_INPUT_CODE;
            response.message = process.env.INVALID_PARAMETER_MSG;
            utils.responseRequest(response, res);
        }
}

const _generateSaltAndCallHash= function (err, salt, req, res, response, password, calBack) {
        if (err) {
            response.status = process.env.INTERNAL_ERROR_CODE;
            response.message = {message: err.message};
        } else {
            console.log("salt is generated ", password, salt);
            bcrypt.hash(password, salt, (err, hash) => calBack(err, hash, req, res, response));
        }
}

const _hashCalback = function (err, hash, req, res, response) {
    if (err) {
        response.status = process.env.INTERNAL_ERROR_CODE;
        response.message = {message: err.message};
    } else {
       let obj = req.body;
       let newUser = {
           name: obj.name,
           username: obj.username,
           password: hash
       }
       const User = mongoose.model(process.env.USER_MODEL);
       User.create(newUser)
           .then(newUser => utils.onSuccessMessageHandler(response, process.env.CREATE_SUCCESS_CODE, newUser))
           .catch(err => utils.onErrorMessageHandler(response, process.env.INTERNAL_ERROR_CODE, err.message))
           .finally(()=> utils.responseRequest(response, res));
    }
}


module.exports.login = function (req, res) {
    const response = {
        status: 200,
        message: {}
    };
    if (utils.checkIfParamsExists(req, "username", "password")) {
        let tokenName = "";
        const User = mongoose.model(process.env.USER_MODEL);
        let username = req.body.username;
        User.findOne({username})
            .then( user => {
                tokenName = user.name;
                _asyncCompare(user, req)
                    .then( data => {
                    if (data) {
                        _asyncToken(tokenName, process.env.JWT_PRIVATE_KEY )
                            .then(token => {
                                res.status(process.env.GET_SUCCESS_CODE).json({success: true, token: token});
                            })
                            .catch(err => res.status(process.env.INTERNAL_ERROR_CODE, err));
                    } else {
                        res.status(process.env.NOT_FOUND_CODE).json({message: "user with provided credentials not in database"})
                    }
                })
            })
            .catch(err => res.status(200).json(err));
    } else {
        response.status = process.env.INVALID_INPUT_CODE;
        response.message = process.env.INVALID_PARAMETER_MSG;
        utils.responseRequest(response, res);
    }
}

const _asyncCompare = function (user, req) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(req.body.password, user.password, function (err, data) {
            if (err ) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
}

const _asyncToken = function (payload, privateKey) {
    return new Promise((resolve, reject) => {
        jwt.sign({username: payload, expiresIn: process.env.JWT_MAX_AGE}, privateKey, function(err, token) {
            if (err) {
                reject(err)
            } else {
                resolve(token);
            }
        })
    })
}