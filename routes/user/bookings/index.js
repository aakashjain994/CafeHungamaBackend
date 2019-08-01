const router = require('express').Router();
const Ticket = require('../../../models/ticket');
const bookings = require('../../../models/booking');
//router.use('/',require('./login'));
router.use('/',require('./get_all_list'));
//router.use('/',require('./result_by_filters'));
router.use('/new',require('./book_ticket'));

router.post('/confirm',async (req,res)=>{
    const ticketId = req.body.ticketId;

    const ticket = await Ticket.findOne({_id:ticketId});
    ticket.status = 'Confirmed';
    ticket.save();
    return res.status(200).json(ticket);
})

router.post('/delete',async (req,res)=>{
    const ticketId = req.body.ticketId;

    const ticket = await Ticket.findOne({_id:ticketId});
    ticket.status = 'not confirmed';
    bookings.findOne({venueId:ticket.venueId}
        ,function(err,booking){
          const slot_price_table = booking.slot_price_table;
          /*ticket.timeSlot.map(timeSlot=>console.log(timeSlot));
          console.log(ticket.timeSlot);*/
          ticket.timeSlot.map(timeSlot=>{
            console.log(timeSlot);
            slot_price_table[0].map(ob=>{
              if(ob.time_slot===timeSlot){
                const filtered_tickets = ob.tickets_booked.filter(id=>{
                    return id!=ticketId
                })
                console.log(filtered_tickets);
              }
            })
            booking.slot_price_table = slot_price_table;
            booking.save();
      })
})
})
module.exports = router;
