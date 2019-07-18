const express = require("express"),
  router = express.Router({ mergeParams: true }),
  Booking = require("../../../models/booking");

router.get("/all", (req, res) => {
   Booking.find({}, (err,allBookings)=> {
     //if they want only some data & not all data that can be done here
     res.json(allBookings)
   });
});

module.exports = router;
