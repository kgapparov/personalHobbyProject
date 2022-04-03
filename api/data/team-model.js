require("dotenv").config();
const mongoose = require("mongoose");

const Player = mongoose.Schema({
    nickName: {
        type: String, 
        required: true
    },
    name: {
        type: String, 
        required: true
    }, 
    position: Number,
    joinDate: Date
})


const Team = mongoose.Schema({
    name: {
        type: String, 
        required : true 
    },
    players: [Player],
    playerCount: {
        type: Number,
        min: 5,
        max: 10, 
        default: 5
    },
    owner : {
        type: String
    }
})

mongoose.model(process.env.TEAM_MODEL, Team, process.env.TEAM_COLLECTION);