const tournamentsController = require("../controller/tournamentsController");
const playersController = require("../controller/player-controller");
const teamsController = require("../controller/teamController");
require("../data/db");
const router = require("express").Router();

//get all Cybergames
router.route("/tournaments")
    .get(tournamentsController.getAll);

router.route("/teams")
    .get(teamsController.getAll)
    .post(teamsController.addOne)

// router.route("/teams/search")
//     .get(teamsController.searchAll);

router.route("/teams/:teamID")
    .get(teamsController.getOne)
    .delete(teamsController.deleteOne)
    .patch(teamsController.updatePartiall);
    

router.route("/teams/:teamID/players")
    .get(playersController.getAll)
    .post(playersController.addOne);

router.route("/teams/:teamID/players/:playerID")
    .get(playersController.getOne)
    .delete(playersController.deleteOne);

module.exports = router