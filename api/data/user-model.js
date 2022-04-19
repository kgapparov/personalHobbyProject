const mongoose = require("mongoose");
const {environment} = require("../../public/angular/dota2Teams/src/environments/environment");


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

mongoose.model(environment.)