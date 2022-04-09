require("dotenv").config();
const mongoose = require("mongoose");
const teamHelpers = require("./teamControllerHelper");
const Teams = mongoose.model(process.env.TEAM_MODEL);


module.exports.getAll = function (req, res) {
    Teams.find().exec((err, teams) => teamHelpers.getAllTeamResponse(err, teams, res));
}


module.exports.getOne = function (req, res) {
    const response = {
        status: 200, 
        message:{}
    }
    const teamID = req.params.teamID;
    if (!teamID || !mongoose.isValidObjectId(teamID)) {
        response.status = 400;
        response.message = {message : "params is absent or invalid"};
    } 
    Teams.findById(teamID).exec((err, team) => teamHelpers.teamResponseOne(err, team, res, response));
}

module.exports.addOne = function (req, res) {
    const response = {
        status: 200, 
        message:{}
    }
    const newTeam = {
        name: req.body.name,
        owner: req.body.owner, 
        playerCount: parseInt(req.body.playerCount) || 5,
        players: []
    }
    newTeam.players = [];
    req.body.players.forEach(player => {
        let newPlayer = {
            name: player.name,
            nickName: player.nickName, 
            position: player.position, 
            joinDate: (Date.parse(player.joinDate))
        }
        newTeam.players.push(newPlayer);
    });

    Teams.create(newTeam, (err, team) => teamHelpers.addOneTeamResponse(err, team, res, response));
}

module.exports.deleteOne = function (req, res) {
    const response = {
        status: 200, 
        message:{}
    }
    const teamID = req.params.teamID;
    if (!teamID || !mongoose.isValidObjectId(teamID)) {
        response.status = 400;
        response.message = {message : "params is absent or invalid"};
    } 
    Teams.deleteOne({_id: teamID}).exec((err, team) => teamHelpers.teamDeleteOneResponseOne(err, team, res, response));
}

module.exports.updatePartiall = function (req, res) {
    const response = {
        status: 201, 
        message:{}
    }
    const teamID = req.params.teamID;
    if (!teamID || !mongoose.isValidObjectId(teamID)) {
        response.status = 400;
        response.message = {message : "params is absent or invalid"};
    } 
    Teams.findById(teamID).exec((err, team) => teamHelpers.teamUpdateAndResponseOne(err, team, res, req,response));
}