const router = require('express').Router();
const Ticket = require('../../../models/ticket');
const Booking = require('../../../models/booking');

router.post('/',async (req,res)=>{
    //const id = req.user._id;

    //const user = id;
    console.log(req.user);
    const user = req.user.id;
    const venueId = req.body.venueId;
    const ticketMRP = req.body.ticketMRP;
    const soldPrice = req.body.soldPrice;
    const couponId = req.body.couponId;
    const timeSlot = req.body.timeSlot;
    const voucherId = req.body.voucherId;
    const fastFilling = req.body.fastFilling;
    const number = req.body.number;
    let Tickets;
    if(!fastFilling){
      Tickets =  new Ticket({
        user:user,
        venueId:venueId,
        ticketMRP:ticketMRP,
        soldPrice:soldPrice,
        timeSlot:timeSlot,
        couponId:couponId,
        voucherId:voucherId,
        status:'on hold',
        number:number,
        date:new Date()
      })
    }
    else{
      Tickets = new Ticket({
        user:user,
        venueId:venueId,
        ticketMRP:ticketMRP,
        soldPrice:soldPrice,
        timeSlot:timeSlot,
        voucherId:voucherId,
        status:'RequestedNP',
        number:number,
        date:new Date()
      })
    }
    try{
      const ticket = await Tickets.save();
     /* bookings.findOne({venueId:venueId}
        ,function(err,booking){
          const slot_price_table = booking.slot_price_table;
          /*ticket.timeSlot.map(timeSlot=>console.log(timeSlot));
          console.log(ticket.timeSlot);*/
         /* ticket.timeSlot.map(timeSlot=>{
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
      });*/
      // date
      console.log(ticket);
      let months = [0,31,28,31,30,31,30,31,31,30,31,30,31];
      let booking = await Booking.findOne({venueId:ticket.venueId});
      let slot_price_table = booking.slot_price_table;
      let index = ticket.date.getMonth() - 1;
      let sum = 0;
      for(let s = 0;s <= index;++s){
        sum += months[s];
      }
      const days = sum + ticket.date.getDay();
      //it should be days instead of 1
      console.log(slot_price_table[1])
      for(const slot of slot_price_table[1]){
        if(ticket.timeSlot.includes(slot.time_slot)){
          slot.tickets_sold += 1
          console.log(slot);
        }
      }
      //console.log(slot_price_table[1]);
      Booking.updateOne({venueId:ticket.venueId},{
        slot_price_table:slot_price_table
      },function(err,affected,resp){
       // console.log(affected);
        console.log(affected,resp);
      })


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

