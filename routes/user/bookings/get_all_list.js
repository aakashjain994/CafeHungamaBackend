const express = require("express"),
  router = express.Router({ mergeParams: true }),
  Booking = require("../../../models/booking");
  Ticket = require("../../../models/ticket");
  Venue = require("../../../models/venue");
/*router.get("/all/:id", (req, res) => {
   /*Booking.find({}, (err,allBookings)=> {
     //if they want only some data & not all data that can be done here
     res.json(allBookings)
   });*/
   //Ticket.find({user)
//});

router.get('/',(req,res)=>{
         console.log(req.params.id);
      //  const userId = req.user._id;
        const bookingdetails = [];
       // console.log(userId);
        console.log(req.user);
        const userId = req.user._id;
        Ticket.find({user:userId}).select('timeSlot ticketMRP status venueId -_id ')
        .then(async bookings=>{
          for(let i of bookings){

          // const booking = await Booking.findOne({venueId:i.venueId})
          //  bookings.findOne({venueId:i.venueId}).then(booking=>console.log(booking))
          const venue = await Venue.findOne({_id:i.venueId}).select('venueName eventType');
          console.log(bookings)
         // console.log(venue,i);
         if(venue!==null){
          const bookingDetails = {}
          //Object.assign() and destructuring are not working
          bookingDetails['eventType'] = venue['eventType'];
          bookingDetails['venueName'] = venue['venueName'];
          bookingDetails['status'] = i['status'];
          bookingDetails['timeSlot'] = i['timeSlot'];
          bookingDetails['ticketMRP'] = i['ticketMRP'];
          bookingdetails.push(bookingDetails);
         }
        }
          //console.log(bookings);
          res.status(200).json(bookingdetails);
        })
        .catch(err=>{
          console.log('error getting past bookings',err);
          return res.status(500).json({msg:'failed to get bookings'})
        })
})

module.exports = router;
