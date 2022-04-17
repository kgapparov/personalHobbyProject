require("dotenv").config();
const mongoose = require("mongoose");
const playerHelpers = require("./player_controller_helpers");
const Teams = mongoose.model(process.env.TEAM_MODEL);
const utils = require("./utils")

module.exports.getAll = function(req, res) {
    const response = {
        status: 200,
        message: {}
    }
    const teamID = req.params.teamID;
    console.log(teamID);
    if (!mongoose.isValidObjectId(teamID)) {
        utils.onErrorMessageHandler(response, process.env.INVALID_INPUT_CODE, process.env.INVALID_PARAMETER_MSG);
        utils.responseRequest(response, res)
    } else 
        Teams.findById(teamID).select("players")
        .then(team => utils.onSuccessMessageHandler(response, process.env.GET_SUCCESS_CODE, team.players))
        .catch(err => utils.onErrorMessageHandler(response, process.env.INTERNAL_ERROR_CODE, err.message))
        .finally(()=> utils.responseRequest(response, res));
}

module.exports.getOne = function(req, res) {
    const response = {
        status: 200,
        message: {}
    }
    const teamID = req.params.teamID;
    if (!mongoose.isValidObjectId(teamID)) {
        utils.onErrorMessageHandler(response, process.env.INVALID_INPUT_CODE, process.env.INVALID_PARAMETER_MSG);
        utils.responseRequest(response, res)
    } else {
        Teams.findById(teamID).select("players")
        .then(teams => playerHelpers.getOnePlayerResponseAndValidate(teams, req))
        .then(player=> utils.onSuccessMessageHandler(response, process.env.GET_SUCCESS_CODE, player))
        .catch((err) => {
            if (err instanceof TypeError) 
                utils.onErrorMessageHandler(response, process.env.INVALID_INPUT_CODE, err.message);
            else if (err instanceof EvalError)
                utils.onErrorMessageHandler(response, process.env.NOT_FOUND_CODE, err.message);
            else
                utils.onErrorMessageHandler(response,  process.env.INTERNAL_ERROR_CODE, err.message);
        })
        .finally(()=> utils.responseRequest(response, res));
    }
}

module.exports.addOne = function(req, res) {
    const response = {
        status: 200,
        message: {}
    }
    const teamID = req.params.teamID;
    Teams.findById(teamID).select("players").exec((err, team) => playerHelpers.addOnePlayerResponseAndValidate(err, team, res, req, response));
}

module.exports.deleteOne = function(req, res) {
    const response = {
        status: 200,
        message: {}
    }
    const teamID = req.params.teamID;
    Teams.findById(teamID).select("players")
    .then(team => playerHelpers.deleteOnePlayerResponseAndValidate(team, req))
    .then(result => utils.onSuccessMessageHandler(response, process.env.DELETE_SUCCESS_CODE, result))
    .catch((err) => {
        if (err instanceof TypeError) 
            utils.onErrorMessageHandler(response, process.env.INVALID_INPUT_CODE, err.message);
        else if (err instanceof EvalError)
            utils.onErrorMessageHandler(response, process.env.NOT_FOUND_CODE, err.message);
        else
            utils.onErrorMessageHandler(response,  process.env.INTERNAL_ERROR_CODE, err.message);
    })
    .finally(()=> utils.responseRequest(response, res));
}
