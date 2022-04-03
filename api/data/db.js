require("dotenv").config();
require("../data/tournament-model");
require("../data/team-model");
const mongoose = require("mongoose");


mongoose.connection.on("connected", function() {
    console.log("Mongodb connected to db ", process.env.DB_NAME);
})

process.on("SIGTERM", function() {
    mongoose.connection.close(function(){
        console.log("Connection to db terminated by application ");
        process.exit(0);
    })
})


process.on("SIGINT", function() {
    mongoose.connection.close(function(){
        console.log("Connection to db terminated by application ");
        process.exit(0);
    })
    
})


mongoose.connection.on("disconnected", function(){
    console.log("Connection to db disconnected");
})

process.on("SIGUSR2", function(){
    mongoose.connection.close(function(){
        console.log("Connection was terminated by application restart");
        process.exit(0);
    })
})

mongoose.connect(process.env.DB_URL);