const tournamentsController = require("../controller/tournamentsController");
require("../data/db");
const router = require("express").Router();

//get all Cybergames
router.route("/tournaments")
    .get();


module.exports = router