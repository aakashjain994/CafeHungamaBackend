const express = require("express"),
  router = express.Router({ mergeParams: true }),
  Client = require("../../../models/client"),
  Venue = require("../../../models/venue");

router.get("/",(req, res) => {
  let { email, contact, firstName, lastName, venue } = req.query;
  let query = {};
  if (email != null) query.email = email;
  if (contact != null) query.contact = contact;
  if (firstName != null) query.firstName = firstName;
  if (lastName != null) query.lastName = lastName;

  if (!(Object.entries(query).length === 0 && query.constructor === Object)) {
    // console.log("hey2");
    let result = Client.find(query)
      .then(foundClients => {
        return res.status(200).json(foundClients);
      })
      .catch(err => {
        res.status(500).send(`error from fetching clients by filter ${err}`);
      });
  }

  if (venue != null) {
      Venue.find({ venueName: venue })
      .populate("clientId")
      .then(venue => {
        return res.status(200).json(venue[0].clientId);
      })
      .catch(err => {
        res.status(500).send(`error from fetching clients by filter ${err}`);
      });
  }
});

module.exports = router;
