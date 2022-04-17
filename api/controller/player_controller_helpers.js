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


const getOnePlayerResponseAndValidate = function (teams, req) {
    return new Promise((resolve, reject) => {
        const playerID = req.params.playerID; 
        if (!mongoose.isValidObjectId(playerID)) {
            reject(new TypeError("Invalid player ID is  provided"));
        } else {
            const player = teams.players.id(req.params.playerID);
            if (!player) {
               reject(new MediaError("The player with this id is Empty!"));
            } else {
                resolve(player);
            }
        }
})
}



const deleteOnePlayerResponseAndValidate = function (teams, req) {
    return new Promise((resolve, reject) => {
        const playerID = req.params.playerID; 
        if (!mongoose.isValidObjectId(playerID)) {
            reject(new TypeError("Invalid player ID is  provided"));
        } else {
            const player = teams.players.id(req.params.playerID);
            if (!player) {
               reject(new EvalError("The player with this id is Empty!"));
            } else {
                player.remove();
                teams.save(function(err, updatedTeams) {
                    if (err) {
                        reject(err)
                    } else {
                        console.log("deleted");
                        resolve(updatedTeams);
                    }
                })
            }
        }
})
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