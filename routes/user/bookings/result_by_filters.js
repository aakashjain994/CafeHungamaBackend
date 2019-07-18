const express = require("express"),
  router = express.Router({ mergeParams: true }),
  Client = require("../../../models/client");



  //NOT REALLY CLEAR
//leaving the venue thing for now
router.get("/", (req, res) => {
  let { type, dateindex, venue,  } = req.query;
  //city is also inside venue
  //venue has to be converted to its id somehow coz bookings has refernce to venue model
  let query = {};

  if (email != null) query.email = email;
  if (contact != null) query.contact = contact;
  if (firstName != null) query.firstName = firstName;
  if (lastName != null) query.lastName = lastName;

  let result = Client.find(query, (err, foundClients) => {
    res.json(foundClients);
  });
});

module.exports = router;
