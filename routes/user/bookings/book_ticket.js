const router = require('express').Router();
const Ticket = require('../../../models/ticket');
const bookings = require('../../../models/booking');

router.post('/',async (req,res)=>{
    const id = req.user._id;
    /*User.findOne({_id:id})
    .then(User => {

    })
    .catch(err => {
      console.log('error finding user:', err)
      return res.status(500).json({msg: 'Failed to find user'})
    })*/
    const user = id;
    const venueId = req.body.venueId;
    const ticketMRP = req.body.ticketMRP;
    const soldPrice = req.body.soldPrice;
    const couponId = req.body.couponId;
    const timeSlot = req.body.timeSlot;
    const voucherId = req.body.voucherId;
    const Tickets = new Ticket({
        user:user,
        venueId:venueId,
        ticketMRP:ticketMRP,
        soldPrice:soldPrice,
        timeSlot:timeSlot,
        couponId:couponId,
        voucherId:voucherId,
        status:'on hold'
      })
    try{
      const ticket = await Tickets.save();
      bookings.findOne({venueId:venueId}
        ,function(err,booking){
          const slot_price_table = booking.slot_price_table;
          /*ticket.timeSlot.map(timeSlot=>console.log(timeSlot));
          console.log(ticket.timeSlot);*/
          ticket.timeSlot.map(timeSlot=>{
            console.log(timeSlot);
            slot_price_table[0].map(ob=>{
              if(ob.time_slot===timeSlot){
                ob.tickets_booked.push(ticket._id);
                console.log(ob);
              }
            })
      })
      booking.slot_price_table = slot_price_table;
      booking.save();
      });
      const {_id} = ticket;
      return res.status(200).json({_id,msg:'success'});

      //console.log(slot_price_table);
     /* .then((ticket) => {
        const venueId = ticket.venueId;
        const booking = await bookings.find({venueId:venueId});
        console.log(booking);
        return res.status(201).json(ticket)
      })
      .catch(err => {
        console.log('error saving user:', err)
        return res.status(500).json({msg: 'Error Booking the ticket'})
      })*/
      //res.status(200).json(slot_price_table);
    }
    catch(err){
      console.log('error saving user:', err)
      return res.status(500).json({msg: 'Error Booking the ticket'})
    }
});




module.exports = router;

