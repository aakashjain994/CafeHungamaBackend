const router = require("express").Router(),
  City = require("../../../models/city");


router.post("/create", async (req, res, next) => {
  try {
    const newCity = await new City(req.body).save();

    if (!newCity)
      //may be this way handle err, not sure
      return res.send("There is some error in creating the city");

    res.send(newCity);
  } catch (err) {
    res.status(400).send(err.message);
  }
});



router.put("/:city_id/put", async (req, res, next) => {
  try {
    const city = await City.findByIdAndUpdate(req.params.city_id,req.body, {new:true});

    if (!city)
      return res.status(404).send("The city with given id was not found");

    res.send(city);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.delete("/:city_id/delete", async (req, res, next) => {
  try {
    const city = await City.findByIdAndRemove(req.params.city_id);

    if (!city)
      return res.status(404).send("The city with given id was not found");

    res.send(city);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
