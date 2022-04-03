const mongoose = require("mongoose");
const Tournaments = mongoose.model(process.env.TOURNAMENT_MODEL);

module.exports.getAll = function(req, res) {
    Tournaments.find().exec(function(err, tournaments) {
        console.log(tournaments);
        res.status(200).json(tournaments);
    })
};