const router = require("express").Router(),
  Admin = require("../../../models/admin"),
  Global = require("../../../models/global");

router.get("/get", async (req, res, next) => {
  try {
    const allDatesData = await Global.find({
        date: { $lte: Date.now() }
    }).sort({date: 1}).limit(7);

    res.send(allDatesData);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
