const mongoose = require("mongoose");
const Teams = mongoose.model(process.env.TEAM_MODEL);

const teamResponseOne = function (err, team, res, response) {
    if (err) {
        response.status = 500;
        response.message = {message : "params is absent or invalid"};
    } else {
        if (team) {
            response.status = 200;
            response.message = team;
        } else {
            response.status = 404;
            response.message = {message: "No object binded to this id"};
        }
    }
    res.status(response.status).json(response.message);
}

const teamDeleteOneResponseOne = function (err, team, res, response) {
    if (err) {
        response.status = 500;
        response.message = {message : "Couldn't delete file from DB"};
    } else {
        response.status = 201;
        response.message = {message : "item deleted successfully"}
    }
    res.status(response.status).json(response.message);
}


const teamUpdateAndResponseOne = function (err, team, res, req, response) {
    if (err) {
        response.status = 500;
        response.message = {message : "Couldn't delete file from DB"};
    } else {
        team.name = req.body.name || team.name; 
        if (req.body.players) {
            req.body.players.forEach(player => {
                const newPlayer = {
                    nickName: player.nickName,
                    name: player.name, 
                    position: player.position, 
                    joinDate: Date.parse(player.joinDate)
                }
                team.players.push(newPlayer);
            });
        }
        team.playerCount = parseInt(req.body.playerCount)|| team.playerCount; 
        team.owner = req.body.owner || team.owner; 
        team.save(function(err, updatedTeam) {
            if (err) {
                response["status"] = 500;
                response["message"] = {massage: "Error while writing to DB"};
            } else {
                console.log(updatedTeam, "updated");
                response["status"] = 201;
                response["message"] = updatedTeam;
                res.status(response.status).json(response.message);
            }
        })
    }
    if (response.status != 201) {
        res.status(response.status).json(response.message);
    }
}


const addOneTeamResponse = function (err, team, res, response) {
    if (err) {
        response.status =500;
        response.message = {message : "error while saving to DB"};
    } else {
        response.status = 200;
        response.message = team;
    }
    res.status(response.status).json(response.message);
}

const getAllTeamResponse = function (err, teams, res) {
    const response = {
        status: 200, 
        message: teams
    }
    if (err) {
        response.status = 500;
        response.message = err;
    } else {
        res.status(response.status).json(response.message);
    }
}
module.exports = {
    teamResponseOne,
    addOneTeamResponse,
    getAllTeamResponse,
    teamDeleteOneResponseOne,
    teamUpdateAndResponseOne
}