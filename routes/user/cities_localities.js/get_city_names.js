const router = require('express').Router(),
      City = require('../../../models/city');
//see the list of all cities
router.get("/onlycities/fetch", async (req, res, next) => {
    console.log("hello")
    try {
      const allCities = await City.find({});
      let data = [];
      allCities.forEach(city => {
          data.push({"cityName": city.city, "cityId": city._id })
      })
      res.send(data);
    } catch (err) {
      res.status(400).send(err.message);
    }
  });

module.exports = router;