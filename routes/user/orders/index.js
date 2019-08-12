const express = require('express');
const router = express.Router({mergeParams:true});
const Ticket = require('../../../models/ticket');
const Booking = require('../../../models/booking');
const Venue = require('../../../models/venue');


router.get('/:id',async (req,res) =>{
        const orders = [];
        const months = [0,31,28,31,30,31,30,31,31,30,31,30,31];
        console.log(req.params.id);
        Ticket.find({user:req.params.id}).select('timeSlot date ticketMRP status venueId -_id ')
        .then(async bookings=>{
            for(let i of bookings){
                if(i.date){
                    console.log(i.date);
                    const compareTo = i.date.getTime();
                    console.log(compareTo);
                    const date = new Date().getTime();
                    if(compareTo - date > 0){
                        console.log(i.venueId);
                        const booking = await Booking.findOne({venueId:i.venueId});
                        const venue  = await Venue.findOne({_id:i.venueId});
                        const slot_price_table = booking.slot_price_table;
                        //actual implementation should match with the timeslot
                        console.log(i);
                        let ob = {}
                        let index = i.date.getMonth()-1;
                        let sum = 0;
                        for(let s = 0;s<=index;++s){
                            sum += months[s];
                        }
                        const days = sum + i.date.getDay();
                        console.log(days);
                        console.log(slot_price_table[1]); // 1 should be replaced with days
                        /*console.log(k);
                        console.log(slot_price_table[2]);*/
                            //the actual date should be matched with here
                        let k = slot_price_table[1]; // slot_price_table[days]
                        const orderDetails = [];
                            for(const slot of k){
                                if(i.timeSlot.includes(slot['time_slot'])){
                                const bookingDetails = {}
                                console.log(i.timeSlot,slot['time_slot']);
                                bookingDetails['status'] = i['status'];
                                bookingDetails['timeSlot'] = slot['time_slot'];
                                bookingDetails['ticketMRP'] = i['ticketMRP'];
                                bookingDetails['ticketsSold'] = slot['ticket_sold'];
                                bookingDetails['minTickets'] = slot['requested_count'];
                                orderDetails.push(bookingDetails);
                                }
                        }
                        if(orderDetails.length !== 0){
                        ob['orders'] = orderDetails;
                        ob['venueName'] = venue.venueName;
                        orders.push(ob)
                        }
                    }
                }
            }
            res.status(200).json(orders);
        }
        )
        .catch(err=>{
            console.log('error getting orders',err);
            return res.status(500).json({msg:'failed to get orders'})
        })


});

module.exports= router;