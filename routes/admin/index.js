const router = require("express").Router();

router.use("/events", require("./events"));
router.use("/venues", require("./venues"));
router.use("/clients", require("./clients"));
router.use("/users", require("./users"));
router.use("/profile", require("./profile"));


//router.use('/', require('./login'));

module.exports = router;
