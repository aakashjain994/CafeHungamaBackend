const router = require('express').Router(),
      Amenity = require('../../../models/amenity');
//see the list of all amenitys
router.get("/get", async (req, res, next) => {
    try {
      const allAmenities = await Amenity.find({});
      res.send(allAmenities);
    } catch (err) {
      res.status(400).send(err.message);
    }
  });

module.exports = router;