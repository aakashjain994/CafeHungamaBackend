const router = require('express').Router(),
      City = require('../../../models/city');
//see the list of all cities
router.get("/get", async (req, res, next) => {
    try {
      const allCities = await City.find({}).populate("localities");
      res.send(allCities);
    } catch (err) {
      res.status(400).send(err.message);
    }
  });

module.exports = router;