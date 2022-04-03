const mongoose = require("mongoose");
const playersAllResponseAndValidate = function (err, teams, res, response) {
    if (err) {
        response.status = 400; 
        response.message = "Invalid TeamID parameter given or db connection problem";
    } else {
        response.status = 200; 
        response.message = teams.players;
    }
    res.status(response.status).json(response.message);
}


const getOnePlayerResponseAndValidate = function (err, teams, res, req, response) {
    if (err) {
        response.status = 500;
        response.message = {message : "Couldn't load data from DB"}
    } else {
        const playerID = req.params.playerID; 
        if (!mongoose.isValidObjectId(playerID)) {
            response.status = 400; 
            response.message = "Invalid player ID";
        } else {
            const player = teams.players.id(req.params.playerID);
            if (!player) {
                response.status = 404; 
                response.message = {message : "Player with this ID absent in DB"};
            } else {
                response.status = 200; 
                response.message = player;
            }
        }
    }
    res.status(response.status).json(response.message);
}


const deleteOnePlayerResponseAndValidate = function (err, team, res, req, response) {
    if (err) {
        response.status = 500;
        response.message = {message : "Couldn't load data from DB"}
    } else {
        const playerID = req.params.playerID; 
        if (!mongoose.isValidObjectId(playerID)) {
            response.status = 400; 
            response.message = "Invalid player ID";
        }
        const player = team.players.id(req.params.playerID);
        if (!player) {
            response.status = 404; 
            response.message = {message : "Player with this ID absent in DB"};
            res.status(response.status).json(response.message);
        } else {
            team.players.id(req.params.playerID).remove();
            team.save(function(err, updatedTeam){
                if (err) {
                    req.status = 500;
                    req.message = {message: "Couldn't update data in DB"};
                } else {
                        req.status = 201;
                        req.message = updatedTeam;
                }
                res.status(response.status).json(response.message);                
            })
        }
    }
}


const addOnePlayerResponseAndValidate = function (err, team, res, req, response) {
    if (err) {
        response.status = 400; 
        response.message = {message : "Invalid TeamID parameter given or db connection problem"};
    } 
    if (team) {
        _addPLayer(team, res, req, response);
    } else {
        response.status = 404;
        response.message = {message: "Team not Found!"};
        res.status(response.status).json(response.message);
    }
}

const _addPLayer = function(team, res, req, response) {
    const newPlayer = {
        nickName : req.body.nickName,
        name: req.body.name,
        position: req.body.position,
        joinDate: Date.parse(req.body.joinDate)
    }
    team.players.push(newPlayer);
    team.save(function(err, updatedTeams){
        if (err) {
            response.status = 400; 
            response.message = "Invalid entries";
        } else {
            response.status = 200;
            response.message = updatedTeams.players;
        }
        res.status(response.status).json(response.message);
    });
    
};

module.exports = {
    playersAllResponseAndValidate,
    getOnePlayerResponseAndValidate,
    addOnePlayerResponseAndValidate,
    deleteOnePlayerResponseAndValidate
}