const express = require('express');
const router = express.Router({mergeParams:true});
const Ticket = require('../../../models/ticket');
const Booking = require('../../../models/booking');


router.get('/:id',async (req,res) =>{
        const orderDetails = [];
        console.log(req.params.id);
        Ticket.find({user:req.params.id}).select('timeSlot date ticketMRP status venueId -_id ')
        .then(async bookings=>{
            for(let i of bookings){
                const booking = await Booking.findOne({venueId:i.venueId});
                const slot_price_table = booking.slot_price_table;
                //actual implementation should match with the timeslot

                const bookingDetails = {}
                bookingDetails['status'] = i['status'];
                bookingDetails['timeSlot'] = i['timeSlot'];
                bookingDetails['ticketMRP'] = i['ticketMRP'];
                bookingDetails['ticketsSold'] = slot_price_table[0][0].ticket_sold;
                bookingDetails['minTickets'] = '200';
                //hardcoding the minimum tickets response
                //should also match with the current Date;
                if(i.date){
                const compareTo = i.date.getTime();
                console.log(compareTo);
                const date = new Date().getTime();
                if(compareTo - date > 0){
                    orderDetails.push(bookingDetails);
                }
            }


            }
            res.status(200).json(orderDetails);
        }
        )
        .catch(err=>{
            console.log('error getting orders',err);
            return res.status(500).json({msg:'failed to get orders'})
        })


});

module.exports= router;