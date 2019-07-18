const express = require("express"),
  router = express.Router({ mergeParams: true }),
  Client = require("../../../models/client"),
  Booking = require("../../../models/booking");

//get all bookings of the client_id
router.get("/", (req, res) => {
  Booking.find(
    {
      clientId: req.params.client_id
    },
    function(err, allVenues) {
      if (err) {
        res.send(err);
        console.log(`err from getting bookings by a client`);
      } else {
        res.json(allVenues);
      }
    }
  );
});

//POST a booking
router.post("/", (req, res) => {
  Client.findById(req.params.client_id, (err, client) => {
    if (err || client == null) {
      res.send(
        `I am from posting booking: found client is ${client} also error is ${err}`
      );
    } else {
      const { venueId, screen, maxUsers, desc, slot_price_table } = req.body;
      const newBooking = {
        venueId,
        screen,
        maxUsers,
        desc,
        slot_price_table,
        clientId: req.params.client_id
      };
      Booking.create(newBooking, (err, newlyCreated) => {
        if (err) {
          res.send(err);
          console.log(`error from new booking added ${err}`);
        } else {
          client.bookings.push(newlyCreated);
          client.save();
          res.json(newBooking);
        }
      });
    }
  });
});

//PUT - LOTS OF LOGIC REMAINING TO BE IMPLEMENTED
router.put("/:booking_id", (req, res) => {
  Booking.findByIdAndUpdate(
    req.params.booking_id,
    req.body,
    (err, foundBooking) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Updated");
      }
    }
  );
});

module.exports = router;
