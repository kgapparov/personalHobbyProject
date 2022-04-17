const teamsController = require("../controller/teamController");
const router = require("express").Router();


router.route("/teams")
    .get(teamsController.getAll)
    .post(teamsController.addOne)

router.route("/teams/search")
    .get(teamsController.searchAll);

router.route("/teams/:teamID")
    .get(teamsController.getOne)
    .delete(teamsController.deleteOne)
    .patch(teamsController.updatePartiall);

module.exports = router; 
