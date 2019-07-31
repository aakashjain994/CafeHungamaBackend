const router = require("express").Router(),
      Venue = require("../../../models/venue");


//see the list of all venues
router.get("/get", async (req, res, next) => {
  try {
    const allvenues = await Venue.find({});
    res.send(allvenues);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

//see the details of one venue
router.get("/:venue_id/get", async (req, res, next) => {
  try {
    // console.log("yes here");
    const venue = await Venue.findById(req.params.venue_id);

    if (!venue)
      return res.status(404).send("The venue with given id was not found");

    res.send(venue);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.put("/:venue_id/put", async (req, res, next) => {
  try {
    const venue = await Venue.findByIdAndUpdate(req.params.venue_id, req.body , {new:true});

    if (!venue)
      return res.status(404).send("The venue with given id was not found");

    res.send(venue);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.delete("/:venue_id/delete", async (req, res, next) => {
  try {
    const venue = await Venue.findByIdAndRemove(req.params.venue_id);

    if (!venue)
      return res.status(404).send("The venue with given id was not found");

    res.send(venue);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
