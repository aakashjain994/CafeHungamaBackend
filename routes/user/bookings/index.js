const router = require('express').Router();
const Ticket = require('../../../models/ticket');
const bookings = require('../../../models/booking');
//router.use('/',require('./login'));


function remove_from_remaining_slots(userId,ticketId,slot){
  bookings.findOne({venueId:ticketId}
    ,function(err,booking){
      const slot_price_table = booking.slot_price_table;
      /*ticket.timeSlot.map(timeSlot=>console.log(timeSlot));
      console.log(ticket.timeSlot);*/
      ticket.timeSlot.map(timeSlot=>{
        console.log(timeSlot);
        slot_price_table[0].map(ob=>{
          if(ob.time_slot!=slot){
            const filtered_tickets = ob.tickets_booked.filter(id=>{
                return id!=ticketId
            })
            console.log(filtered_tickets);
          }
        })
        booking.slot_price_table = slot_price_table;
        booking.save();
  })
})}
router.use('/',require('./get_all_list'));
//router.use('/',require('./result_by_filters'));
router.use('/new',require('./book_ticket'));

router.post('/confirm',async (req,res)=>{
    const ticketId = req.body.ticketId;
    const fastFilling = req.body.fastFilling;
    if(fastFilling){
      const ticket = await Ticket.findOne({_id:ticketId});
      ticket.status = 'Requested';

    }
    else{
    const ticket = await Ticket.findOne({_id:ticketId});
    ticket.status = 'Confirmed';
    }
    bookings.findOne({venueId:ticket.venueId}
      ,function(err,booking){
        const slot_price_table = booking.slot_price_table;
        /*ticket.timeSlot.map(timeSlot=>console.log(timeSlot));
        console.log(ticket.timeSlot);*/
        ticket.timeSlot.map(timeSlot=>{
          console.log(timeSlot);
          slot_price_table[0].map(ob=>{
            if(ob.time_slot===timeSlot){
              ob.tickets_booked.push(ticketId);
              if(tickets_booked.length == requested_count){
                //we should confirm this ticket and remove from remaining
                ticket.status = 'Confirmed';
                //send a notification to the user about the confirmation and all slots will be closed
                //remove this user from remaining slots
                remove_from_remaining_slots(ticketId,timeSlot);
              }

            }
          })
          booking.slot_price_table = slot_price_table;
          booking.save();
    })
})
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
