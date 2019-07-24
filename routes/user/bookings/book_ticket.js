const router = require('express').Router();
const Ticket = require('../../../models/ticket');

router.post('/',(req,res)=>{

    const user = req.body.user;
    const venueId = req.body.venueId;
    const ticketMRP = req.body.ticketMRP;
    const soldPrice = req.body.soldPrice;
    const couponId = req.body.couponId;
    const timeSlot = req.body.time_slot;
    const voucherId = req.body.voucherId;

    const Tickets = new Ticket({
        user:user,
        venueId:venueId,
        ticketMRP:ticketMRP,
        soldPrice:soldPrice,
        timeSlot:timeSlot,
        couponId:couponId,
        voucherId:voucherId
      })
      Tickets.save()
      .then(ticket => {
        return res.status(201).json(ticket)
      })
      .catch(err => {
        console.log('error saving user:', err)
        return res.status(500).json({msg: 'Error Booking the ticket'})
      })
});


module.exports = router;

