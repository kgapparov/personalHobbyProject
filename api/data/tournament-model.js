const mongoose = require("mongoose");
require("dotenv").config();

const Tournament = mongoose.Schema({
    name: {
        type : String,
        required: true
    }, 
    start_date: {
        type : Date
    },
    end_date: {
        type : Date
    },
    price : {
        type: Number,
        min: 100, 
        default: 0
    },
    location: {
        type : String,
        required : true
    }, 
    winner: {
        team_id: mongoose.ObjectId,
        team_name: String
    },
    winner: {
        team_id: mongoose.ObjectId,
        team_name: String
    },
})

mongoose.model(process.env.TOURNAMENT_MODEL, Tournament, process.env.TOURNAMENT_COLLECTION);