const mongoose = require('mongoose'),
Admin   = require('./admin');

const couponSchema = new mongoose.Schema({
    admin:{
        type: mongoose.Schema.Types.ObjectId,
        ref: Admin
    },
     code: {
        type: String,
        required: true
    },
    discount : {
        type : Number,
        required : true
    },
    otherDetails: {
       type : String 
    }
});

module.exports = mongoose.model("Voucher",couponSchema);