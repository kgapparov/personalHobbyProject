require("dotenv").config();
const mongoose = require("mongoose");
const teamHelpers = require("./teamControllerHelper");
const utils = require("./utils");
const Teams = mongoose.model(process.env.TEAM_MODEL);



module.exports.getAll = function (req, res) {
    const response = {
        status : process.env.GET_SUCCESS_CODE, 
        message : {}
    }
    Teams.find()
    .then(teams => utils.onSuccessMessageHandler(response, process.env.GET_SUCCESS_CODE, teams))
    .catch(err => utils.onErrorMessageHandler(response, process.env.INTERNAL_ERROR_MSG, err))
    .finally(()=> utils.responseRequest(response, res));
}

module.exports.searchAll = function (req, res) {
    const name = req.query.name; 
    Teams.find({name: {"$regex": name ,'$options':'i'}}).exec((err, teams) => teamHelpers.getAllTeamResponse(err, teams, res));
}

module.exports.getOne = function (req, res) {
    const response = {
        status: process.env.GET_SUCCESS_CODE, 
        message:{}
    }
    const teamID = req.params.teamID;
    if (!teamID || !mongoose.isValidObjectId(teamID)) {
        utils.onErrorMessageHandler(response, process.env.INVALID_INPUT_CODE, process.env.INVALID_PARAMETER_MSG);
    } else {
        Teams.findById(teamID)
        .then(team => {
            if (!team) {
                utils.onErrorMessageHandler(response,process.env.NOT_FOUND_CODE, process.env.NOT_FOUND_MSG);
            } else {
                utils.onSuccessMessageHandler(response, process.env.GET_SUCCESS_CODE, team);
            }
        })
        .catch(err => utils.onErrorMessageHandler(response, process.env.INTERNAL_ERROR_MSG, err))
        .finally(()=> utils.responseRequest(response, res));
    }
    if (response.status != process.env.GET_SUCCESS_CODE) {
        utils.responseRequest(response, res);
    }
}

module.exports.addOne = function (req, res) {
    console.log(req.body);
    const response = {
        status: 200, 
        message:{}
    }
    const newTeam = {
        name: req.body.name,
        owner: req.body.owner, 
        playerCount: parseInt(req.body.playerCount) || 0,
        players: []
    }
    newTeam.players = [];
    if (req.body && req.body.players) {
        req.body.players.forEach(player => {
            let newPlayer = {
                name: player.name,
                nickName: player.nickName, 
                position: player.position, 
                joinDate: (Date.parse(player.joinDate)) || new Date()
            }
            newTeam.playerCount += 1;
            newTeam.players.push(newPlayer);
            console.log(newTeam);
        });
    }
    Teams.create(newTeam)
    .then((newTeam) => utils.onSuccessMessageHandler(response, process.env.CREATE_SUCCESS_CODE, newTeam))
    .catch(err => utils.onErrorMessageHandler(response, process.env.INTERNAL_ERROR_CODE, err.message))
    .finally(()=> {
        console.log(response);
        utils.responseRequest(response, res)
    });
}

module.exports.deleteOne = function (req, res) {
    const response = {
        status: 200, 
        message:{}
    }
    const teamID = req.params.teamID;
    if (!teamID || !mongoose.isValidObjectId(teamID)) {
       utils.onErrorMessageHandler(response, process.env.INVALID_INPUT_CODE, process.env.INVALID_PARAMETER_MSG);
       utils.responseRequest(response, res);
    } else {
        Teams.deleteOne({_id: teamID}) 
        .then(utils.onSuccessMessageHandler(response, process.env.DELETE_SUCCESS_CODE, process.env.DELETED_SUCCESS_MSG))
        .catch(err => utils.onErrorMessageHandler(response, process.env.INTERNAL_ERROR_MSG, err))
        .finally(()=> utils.responseRequest(response, res));
    }
    
}

module.exports.updatePartiall = function (req, res) {
    const response = {
        status: 201, 
        message:{}
    }
    const teamID = req.params.teamID;
    if (!teamID || !mongoose.isValidObjectId(teamID)) {
        utils.onErrorMessageHandler(response, process.env.INVALID_INPUT_CODE, process.env.INVALID_PARAMETER_MSG);
        utils.responseRequest(response, res);
    } else 
        Teams.findById(teamID).exec((err, team) => teamHelpers.teamUpdateAndResponseOne(err, team, res, req,response));
}