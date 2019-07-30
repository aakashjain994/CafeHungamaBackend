const express = require("express"),
  router = express.Router({ mergeParams: true }),
  User = require("../../../models/user");

//leaving the venue thing for now
router.get("/", (req, res) => {
  let { email, contact, firstName, lastName, userName } = req.query;
  let query = {};

  if (email != null) query.email = email;
  if (contact != null) query.contact = contact;
  if (firstName != null) query.firstName = firstName;
  if (lastName != null) query.lastName = lastName;
  if (userName != null) query.userName = userName;

  let result = User.find(query, (err, foundUsers) => {
    res.json(foundUsers);
  });
});

module.exports = router;
