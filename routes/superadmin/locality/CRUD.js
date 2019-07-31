const router = require("express").Router(),
  Locality = require("../../../models/locality"),
  City = require("../../../models/city");

router.get("/get", async (req, res, next) => {
  try {
    const allLocalities = await Locality.find({});
    res.send(allLocalities);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post("/:city_id/create", async (req, res, next) => {
  try {
    console.log(req.params.city_id);
    const city = await City.findById(req.params.city_id);
    // return res.json(city);
    if (!city) return res.send("city with the given id doesn't exist");
    // console.log(city);

    const newLocality = await new Locality(req.body);
    if (!newLocality)
      //may be this way handle err, not sure
      return res.send("There is some error in creating the locality");

    newLocality.city_id = req.params.city_id;
    newLocality.save();

    console.log(city);
    city.localities.push(newLocality);
    city.save();

    res.send(newLocality);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.put("/:locality_id/put", async (req, res, next) => {
  try {
    const locality = await Locality.findByIdAndUpdate(
      req.params.locality_id,
      req.body,
      { new: true }
    );

    if (!locality)
      return res.status(404).send("The locality with given id was not found");

    res.send(locality);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.delete("/:locality_id/delete", async (req, res, next) => {
  try {
    const locality = await Locality.findByIdAndRemove(req.params.locality_id);

    if (!locality)
      return res.status(404).send("The locality with given id was not found");

    res.send(locality);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
