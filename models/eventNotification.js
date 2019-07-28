const mongoose = require('mongoose'),
      Schema   = mongoose.Schema;

const eventNotificationSchema = new Schema({

    notification: {
        type: String,
    },
    read: {
        type: Boolean,
        default: false,
    }

}, {timestamps: true});

module.exports = mongoose.model("EventNotification",eventNotificationSchema);