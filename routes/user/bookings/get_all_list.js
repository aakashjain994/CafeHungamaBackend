const express = require("express"),
  router = express.Router({ mergeParams: true }),
  Booking = require("../../../models/booking");
  Ticket = require("../../../models/ticket");
/*router.get("/all/:id", (req, res) => {
   /*Booking.find({}, (err,allBookings)=> {
     //if they want only some data & not all data that can be done here
     res.json(allBookings)
   });*/
   //Ticket.find({user)
//});

router.get('/:id',(req,res)=>{

  const userId = req.params.id;
  console.log(userId);
  Ticket.find({user:userId})
        .then(bookings=>{
          res.status(200).json(bookings);
        })
        .catch(err=>{
          console.log('error getting past bookings',err);
          return res.status(500).json({msg:'failed to get bookings'})
        })
})

module.exports = router;
