require("dotenv").config();
const mongoose = require("mongoose");
const playerHelpers = require("./player_controller_helpers");
const Teams = mongoose.model(process.env.TEAM_MODEL);


module.exports.getAll = function(req, res) {
    const response = {
        status: 200,
        message: {}
    }
    const teamID = req.params.teamID;
    Teams.findById(teamID).select("players").exec((err, teams) => playerHelpers.playersAllResponseAndValidate(err, teams, res, response));
}

module.exports.getOne = function(req, res) {
    const response = {
        status: 200,
        message: {}
    }
    const teamID = req.params.teamID;
    Teams.findById(teamID).select("players").exec((err, teams) => playerHelpers.getOnePlayerResponseAndValidate(err, teams, res, req, response));
}

module.exports.addOne = function(req, res) {
    const response = {
        status: 200,
        message: {}
    }
    const teamID = req.params.teamID;
    Teams.findById(teamID).select("players").exec((err, team) => playerHelpers.addOnePlayerResponseAndValidate(err, team, res, req, response));
}