require("dotenv").config();
require("./api/data/db");
const express = require("express");
const route = require("./api/router/route");
const app = express();

const loggingHandler = function(req, res, next) {
    console.log(req.method, req.url);
    next();
}

//logging all requiests
app.use(loggingHandler);

//route 
app.use("/api", route);

//start server
const server = app.listen(process.env.PORT, function(err){
    if (err) {
        console.log("Couldn't start server");
    }
    console.log(process.env.LISTEN_TO_PORT_MSG, server.address().port);
})