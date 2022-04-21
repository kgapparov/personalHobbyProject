const router = require("express").Router();
const utils = require("../controller/utils");
const userController = require("../controller/userController");


router.route("")
    .post(userController.addUser)

router.route("/check")
    .post(userController.login);


router.route("/:id")
    .get(utils.blankPage)
    .post(utils.blankPage);

module.exports = router;