const express = require("express"),
  Venue = require("../../../models/venue"),
  Client = require("../../../models/client"),
  router = express.Router({ mergeParams: true });

router.get("/", (req, res) => {
  Venue.find({
    clientId: req.params.client_id
  }, function(err, allVenues) {
    if (err) {
      console.log(err);
    } else {
      res.json(allVenues);
    }
  });
});

//after auth req.user will have the authenticated user
router.post("/", (req, res) => {
  const {
    image,
    verified,
    venueName,
    noOfScreens,
    street_block,
    line1,
    line2,
    eventType,
    city,
    state,
    country,
    pinCode,
    venueContact,
    amenities,
    maxCapacity
  } = req.body;
  const newVenue = {
    image,
    verified,
    venueName,
    noOfScreens,
    street_block,
    line1,
    line2,
    eventType,
    city,
    state,
    country,
    pinCode,
    venueContact,
    amenities,
    maxCapacity,
    clientId: req.params.client_id
  };

  Client.findById(req.params.client_id, (err, client) => {
    if (err) {
      res.send(err);
    } else {
      Venue.create(newVenue, (err, newlyCreated) => {
        if (err) {
          res.send(err);
          console.log(`error from new venue adding: ${err}`);
        } else {
          client.venues.push(newlyCreated);
          client.save();
          res.json(newlyCreated);
        }
      });
    }
  });
});

// To see a particular venue
router.get("/:venue_id", (req, res) => {
  Venue.findById(req.params.venue_id, (err, foundVenue) => {
    if (err) {
      res.send(err);
    } else {
      res.json(foundVenue);
    }
  });
});

module.exports = router;
