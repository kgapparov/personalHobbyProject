require("../data/db");
const playerRouter = require("./playerRouter");
const teamsRouter = require("./teamRouter");
const router = require("express").Router();
const userRouter = require("../router/usersRouter");

router.use("", teamsRouter);
router.use("/teams", playerRouter);
router.use("/users", userRouter);

module.exports = router