const router = require("express").Router();
const utils = require("../controller/utils");


router.route("/:id")
    .get(utils.blankPage)
    .post(utils.blankPage);

module.exports = router;