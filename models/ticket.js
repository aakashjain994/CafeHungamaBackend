const mongoose = require('mongoose'),
User   = require('./user'),
Coupon = require('./coupon'),
Voucher = require('./voucher'),
Event = require('./event');



const ticketSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    eventId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: Event
    },
    ticketMRP: {
        type: Number,
        required: true
    },
    
    soldPrice: {
        type: Number,
        required: true
    },
    couponId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: Coupon
    }],
    voucherId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: Voucher
    }],
    

    //incomplete

});

module.exports = mongoose.model("Ticket",ticketSchema);