const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId,
  EventNotification = require("./eventNotification");

// import { Schema } from "mongoose";

var validatePhone = function(contact) {
  var re = /^\d{10}$/;
  return contact == null || re.test(contact);
};

const clientSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 2
  },
  lastName: {
    type: String,
    required: false,
    minlength: 2
  },
  userName: {
    type: String,
    default: function() {
      return this.firstName + this.lastName;
    }
  },
  email: {
    type: String,
    required: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address"
    ]
  },
  contact: {
    type: Number,
    required: true,
    validate: [validatePhone, "Please fill a valid phone number"]
  },
  alternateContact: {
    type: Number,
    validate: [validatePhone, "Please fill a valid phone number"]
  },
  line1Add: {
    type: String,
    required: true,
    minlength: 2
  },
  line2Add: {
    type: String
  },
  city: {
    type: String,
    required: true,
    minlength: 2
  },
  state: {
    type: String,
    required: true,
    minlength: 2
  },
  country: {
    type: String,
    required: true,
    minlength: 2
  },
  companyName: {
    type: String,
    required: true
  },
  pending_pay: {
    type: Number
  },
  queries: [
    {
      type: String
    }
  ],
  bankdetails: [
    {
      type: ObjectId,
      ref: "Bankdetails"
    }
  ],
  venues: [
    {
      type: ObjectId,
      ref: "Venue"
    }
  ],
  bookings: [
    {
      type: ObjectId,
      ref: "Booking"
    }
  ],
  eventNotifications: [
    {
      type: ObjectId,
      ref: "EventNotification"
    }
  ],
  requestNotifications: [
    {
      type: ObjectId,
      ref: "RequestNotification"
    }
  ],
  paymentNotifications: [
    {
      type: ObjectId,
      ref: "PaymentNotification"
    }
  ],
  paymentDetails: [
    {
      transaction_id: {
        type: Number,
        required: true
      },
      date: {
        type: Date,
        required: true
      },
      amount: {
        type: Number,
        required: true
      },
      opening_balance: {
        type: Number,
        required: true
      },
      closing_balance: {
        type: Number,
        required: true
      }
    }
  ]
});

// Custom validation
// clientSchema.path('contact').validate(function (value) {

//   // Your validation code here, should return bool
//   var re = /^\d{10}$/;
//   return (v == null || v.trim().length < 1) || re.test(v)

// }, 'Please enter a valid phone number');

// //using virtuals
// clientSchema.virtual("username").get(function() {
//   return this.firstName + " " + this.lastName;
// });

module.exports = mongoose.model("Client", clientSchema);
