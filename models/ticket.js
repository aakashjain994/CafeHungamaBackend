const mongoose = require('mongoose');
User   = require('./user');
Coupon = require('./coupon');
Voucher = require('./voucher');
Venue = require('./venue');

const ticketSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    status:{
        type:String,
        default:'not confirmed'
    },
    venueId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: Venue
    },
    ticketMRP: {
        type: Number,
        required: true
    },
    date:{
        type:Date
    },
    soldPrice: {
        type: Number,
        required: true
    },
    timeSlot:{
        type:[String],
        required:true
    },
    couponId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: Coupon
    }],
    voucherId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: Voucher
    }],
    number:{
        type:Number
    }
    //incomplete

}
);
/*ticketSchema.index({createdAt:1},{expireAfterSeconds:10});

ticketSchema.pre('remove', { document: true }, function() {
    console.log('Removing doc!');
});*/

module.exports = mongoose.model("Ticket",ticketSchema);