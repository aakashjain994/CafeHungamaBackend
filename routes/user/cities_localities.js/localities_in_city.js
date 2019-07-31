const router = require("express").Router(),
  Locality = require("../../../models/locality"),
  City = require("../../../models/city");
//see the list of all cities
router.get("/:city_id/get", async (req, res, next) => {
  try {
    const allLocalitiesWithinCity = await Locality.find({
      city_id: req.params.city_id
    });

    res.send(allLocalitiesWithinCity);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
