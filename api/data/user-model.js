const mongoose = require("mongoose");
require("dotenv").config();


const User = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username : {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

mongoose.model(process.env.USER_MODEL, User, process.env.USER_COLLECTION);