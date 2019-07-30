//this will always be received by admin

const mongoose = require('mongoose'),
      Schema   = mongoose.Schema;

const paymentNotificationSchema = new Schema({

    notification: {
        type: String,
        createdAt: Date.now
    },
    read: {
        type: Boolean,
        default: false,
    },
    pendingPayment: {       //may or may not be needed
        type: Boolean,
        default: true,
    }
});

module.exports = mongoose.model("PaymentNotification",paymentNotificationSchema);