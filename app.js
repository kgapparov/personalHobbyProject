require("dotenv").config();
require("./api/data/db");
const express = require("express");
const route = require("./api/router/route");
const app = express();
const bodyParser = require("body-parser")
const jsonParser = bodyParser.json();

const loggingHandler = function(req, res, next) {
    console.log(req.method, req.url);
    next();
}
const headerAccessHandler = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control_Allow-Origin", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, DELETE, PUT, PATCH");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
}
//logging all requiests
app.use(loggingHandler);

app.use(headerAccessHandler);
//route 
app.use("/api", jsonParser ,route);

//start server
const server = app.listen(process.env.PORT, function(err){
    if (err) {
        console.log("Couldn't start server");
    }
    console.log(process.env.LISTEN_TO_PORT_MSG, server.address().port);
})