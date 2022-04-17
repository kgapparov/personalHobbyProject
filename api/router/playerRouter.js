const playersController = require("../controller/player-controller");
const router = require("express").Router();


router.route("/:teamID/players")
    .get(playersController.getAll)
    .post(playersController.addOne);

router.route("/:teamID/players/:playerID")
    .get(playersController.getOne)
    .delete(playersController.deleteOne);

module.exports = router