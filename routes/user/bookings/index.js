const router = require('express').Router();
const Ticket = require('../../../models/ticket');
const Booking = require('../../../models/booking');
const Venues = require('../../../models/venue');
//router.use('/',require('./login'));
var Pusher = require('pusher');

var channels_client = new Pusher({
  appId: '841453',
  key: '2650b5b1610744e74733',
  secret: 'b3615c743ef61a53ca4c',
  cluster: 'ap2',
  encrypted: true
});

async function remove_requested_users_from_remaining_slots(slot_price_table,slot,ticket,day){
  //console.log(slot_price_table);
   slot.tickets_booked.map(async tickets_1=>{
    if(tickets_1.status == 'Requested'){
      console.log('changing requested to confirmed');
      tickets_1.status = 'Confirmed';
      //send a notification to the user that the ticket is confirmed
      let timeSlots = tickets_1.timeSlot.filter(timeSlot=>timeSlot!==slot.time_slot);
      console.log(timeSlots);
      tickets_1.timeSlot = slot.time_slot;
      //actual day slot_price_table[day]
      console.log(tickets_1.timeSlot);
      await Ticket.updateOne({_id:tickets_1._id},{
        status:tickets_1.status,
        timeSlot:slot.time_slot
      },
      function(err,affected,resp){

      }
)
      let index = 0;
      for(const slots of slot_price_table[1]){
       // console.log(slots);
        if(timeSlots.includes(slots['time_slot'])){
          let filtered_tickets = slots.tickets_booked.filter(tickets_2=>{
            if(tickets_2.status == 'Confirmed'){
              return tickets_2;
            }
            else{
              console.log('why the fuck i am not going out')
              if(!tickets_2._id.equals(tickets_1._id)){
                console.log(tickets_2,tickets_1);
                console.log('why the fuck i am not going')
                return tickets_2;
              }
            }
            //return tickets_2.status !== 'Requested' && tickets_2._id==tickets_1.id;
          })
          slot_price_table[1][index].tickets_booked = filtered_tickets;
          //console.log(filtered_tickets);
          //console.log(slot_price_table[1][index]);
          slot_price_table[1][index].confirmed_count = slot_price_table[1][index].tickets_booked.length;
          slot_price_table[1][index].tickets_sold = slot_price_table[1][index].confirmed_count;
          Booking.updateOne({venueId:ticket.venueId},{
            slot_price_table:slot_price_table
          },function(err,affected,resp){
           // console.log(affected);
          })
        }
        index += 1;
      }
    }
  })

 /* bookings.findOne({venueId:ticketId}
    ,function(err,booking){
      const slot_price_table = booking.slot_price_table;
      /*ticket.timeSlot.map(timeSlot=>console.log(timeSlot));
      console.log(ticket.timeSlot);*/

     /* ticket.timeSlot.map(timeSlot=>{
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
        booking.save();*/
 // })
// })}
}
router.use('/',require('./get_all_list'));
router.use('/new',require('./book_ticket'));
//router.use('/',require('./result_by_filters'));

router.post('/confirm',async (req,res)=>{
    const months = [0,31,28,31,30,31,30,31,31,30,31,30,31];
    const ticketId = req.body.ticketId;
    const fastFilling = req.body.fastFilling;
    const ticket = await Ticket.findOne({_id:ticketId}).populate('venueId');
    console.log(fastFilling);
    if(fastFilling){
      ticket.status = 'Requested';
    }
    else{
    ticket.status = 'Confirmed';
    }
    const booking = await Booking.findOne({venueId:ticket.venueId});
    const slot_price_table = booking.slot_price_table;
    let index = ticket.date.getMonth() - 1;
    let sum = 0;
    for(let s = 0;s <= index;++s){
      sum += months[s];
    }
    const days = sum + ticket.date.getDay();

     // 1 should be replaced with days
    for(const slot of slot_price_table[1]){
      if(ticket.timeSlot.includes(slot['time_slot'])){
        if(!slot.tickets_booked){
          slot.tickets_booked = []
        }
       // slot.tickets_sold = parseInt(slot.tickets_sold) + 1;
        slot.confirmed_count = slot.tickets_booked.length + 1;
        slot.tickets_sold = slot.confirmed_count;
      //  console.log(slot.tickets_booked.includes(ticket));
        slot.tickets_booked.push(ticket);
        if(slot.confirmed_count >= slot.requested_count){
          await remove_requested_users_from_remaining_slots(slot_price_table,slot,ticket,days);
          slot.confirmed_count = slot.tickets_booked.length;
          slot.tickets_sold = slot.confirmed_count;
        }
      //  console.log(slot);
      }
    }
    //booking.slot_price_table = slot_price_table;
    Booking.updateOne({venueId:ticket.venueId},{
      slot_price_table:slot_price_table
    },function(err,affected,resp){
     // console.log(affected);
    })
    //console.log(booking.slot_price_table);

    /*ticket.timeSlot.map(timeSlot=>console.log(timeSlot));
        console.log(ticket.timeSlot);
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
                //remove_from_remaining_slots(ticketId,timeSlot);
              }

            }
          })
          booking.slot_price_table = slot_price_table;
          booking.save();
    })*/
//})
    await ticket.save();
   // const venue = await Venues.findOne({_id:ticket.venueId});
    console.log(req.user.email);
    channels_client.trigger('booking',req.user.email, {
      "message": ticket
    });
    return res.status(200).json(ticket);
})

router.post('/delete',async (req,res)=>{
    const ticketId = req.body.ticketId;

    const ticket = await Ticket.findOne({_id:ticketId});
    ticket.status = 'not confirmed';
    /*bookings.findOne({venueId:ticket.venueId}
        ,function(err,booking){
          const slot_price_table = booking.slot_price_table;
          /*ticket.timeSlot.map(timeSlot=>console.log(timeSlot));
          console.log(ticket.timeSlot);*/
        /*  ticket.timeSlot.map(timeSlot=>{
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
      })*/
    const months = [0,31,28,31,30,31,30,31,31,30,31,30,31];
    const booking = await Booking.findOne({venueId:ticket.venueId});
    const slot_price_table = booking.slot_price_table;
    let index = ticket.date.getMonth() - 1;
    let sum = 0;
    for(let s = 0;s <= index;++s){
        sum += months[s];
    }
    const days = sum + ticket.date.getDay();
      // 1 should be replaced with days
    for(const slot of slot_price_table[1]){
      if(ticket.timeSlot.includes(slot['time_slot'])){
        if(!slot.tickets_booked){
            slot.tickets_booked = [];
            slot.confirmed_count = 0;
        }
         // slot.tickets_sold = parseInt(slot.tickets_sold) + 1;
        slot.tickets_sold = slot.confirmed_count;
      }
    }
    Booking.updateOne({venueId:ticket.venueId},{
      slot_price_table:slot_price_table
    },function(err,affected,resp){
        console.log(affected);
    })
}
)
module.exports = router;
