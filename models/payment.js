const mongoose = require('mongoose');
   Client= require('./client');
// Coupon = require('./coupon'),
// Voucher = require('./voucher'),
// Event = require('./event');



const paymentSchema = new mongoose.Schema({
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Client
    },
    month:{
    Jan:{
        type: Number,   
        default:0  
    },
    Feb:{
        type: Number,   
        default:0 
    },
    Mar:{
        type: Number,   
        default:0    
    },
    Apr:{
        type: Number,   
        default:0    
    },
    May:{
        type: Number,   
        default:0    
    },
    Jun:{
        type: Number,   
        default:0    
    },
    Jul:{
        type: Number,   
        default:0    
    },
    Aug:{
        type: Number,   
        default:0    
    },
    Sep:{
        type: Number,   
        default:0    
    },
    Oct:{
        type: Number,   
        default:0    
    },
    Nov:{
        type: Number,   
        default:0    
    },
    Dec:{
        type: Number,   
        default:0    
    }
},
dues:{
    type : Number,
    default:0
},
donePay:{
    type : Number,
    default:0
}
});

module.exports = mongoose.model("Payment",paymentSchema);