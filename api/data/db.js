require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connection.on("connected", function() {
    console.log("Mongodb connected to db ", process.env.DB_NAME);
})

mongoose.connection.on("SIGTERM", function() {
    console.log("Connection to db terminated by application ");
    process.exit(0);
})

mongoose.connection.on("disconnected", function(){
    console.log("Connection to db disconnected");
})

mongoose.connection.on("SIGUSR2", function(){
    console.log("Connected terminated by application restart");
    process.exit(0);
})

mongoose.connect(process.env.DB_URL);