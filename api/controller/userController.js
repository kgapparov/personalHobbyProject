const mongoose = require("mongoose");
require("dotenv").config();


module.exports.addUser=function(req, res) {
    const User = mongoose.model(process.env.USER_MODEL);
    
}