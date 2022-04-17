require("../data/db");
const playerRouter = require("./playerRouter");
const teamsRouter = require("./teamRouter");
const router = require("express").Router();


router.use("", teamsRouter);
router.use("/teams", playerRouter);

module.exports = router