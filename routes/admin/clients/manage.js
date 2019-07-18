const express = require("express"),
  router = express.Router({ mergeParams: true }),
  Client = require("../../../models/client");

//leaving the venue thing for now
router.get("/", (req, res) => {
  let { email, contact, firstName, lastName } = req.query;
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
