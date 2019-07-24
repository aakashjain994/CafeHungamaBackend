const express = require("express"),
  router = express.Router({ mergeParams: true }),
  Client = require("../../../models/client"),
  Venue = require("../../../models/venue");

//leaving the venue thing for now
router.get("/", async (req, res) => {
  let { email, contact, firstName, lastName, venue } = req.query;
  let query = {};
  if (email != null) query.email = email;
  if (contact != null) query.contact = contact;
  if (firstName != null) query.firstName = firstName;
  if (lastName != null) query.lastName = lastName;

  if (!(Object.entries(query).length === 0 && query.constructor === Object)) {
    console.log("hey2");
    let result = await Client.find(query)
      .then(foundClients => {
        //foundClients is an array
        //option1: send it as it is 
        //option2: send required data only
        //leaving for now, refer notes stackoverflow
        return res.status(200).json(foundClients);
      })
      .catch(err => {
        res.status(500).send(`error from fetching clients by filter ${err}`);
      });
  }

  if (venue != null) {
    let result = await Venue.find({ venueName: venue })
      .populate("clientId")
      .exec()
      .then(venue => {
        let obj = {
          userName: venue[0].clientId.userName,
          firstName: venue[0].clientId.firstName,
          lastName: venue[0].clientId.lastName,
          pending_Pay: venue[0].clientId.pending_Pay,
          companyName: venue[0].clientId.companyName
        };

        // const obj = {
        //   userName,
        //   firstName,
        //   lastName,
        //   pending_Pay,
        //   companyName,
        //   ...extradata
        // } = venue[0].clientId;
        // console.log(extradata);
        return res.status(200).json(obj);
      }) 
      .catch(err => {
        res.status(500).send(`error from fetching clients by filter ${err}`);
      });
  }
});

module.exports = router;
