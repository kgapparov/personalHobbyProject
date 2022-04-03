
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

const addOneTeamResponse = function (err, team, res, response) {
    if (err) {
        response.status =500;
        response.message({message : "error while saving to DB"});
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
    getAllTeamResponse
}