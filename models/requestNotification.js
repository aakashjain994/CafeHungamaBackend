//this will always be received by admin

const mongoose = require('mongoose'),
      Schema   = mongoose.Schema;

const requestNotificationSchema = new Schema({

    notification: {
        type: String,
    },
    read: {
        type: Boolean,
        default: false,
    },
    requestResolved: {       //may or may not be needed
        type: Boolean,
        default: false,
    }
});

module.exports = mongoose.model("RequestNotification",requestNotificationSchema);
