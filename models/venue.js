const mongoose = require("mongoose");

var validatePhone = function(contact) {
  var re = /^\d{10}$/;
  return contact == null || re.test(contact);
};

var validatePin = function(pincode) {
  var re = /^\d{6}$/;
  return pincode == null || re.test(pincode);
};

const venueSchema = new mongoose.Schema({
  venueName: {
    type: String,
    unique: true,
    required: true,
    minlength: 2
  },
  noOfScreens: {
    type: Number,
    required: true,
    min: 1,
    max: 100
  },
  line1: {
    type: String,
    required: false,
    minlength: 2
  },
  line2: {
    type: String,
    required: false
  },
  city: {
    type: String,
    required: true,
    minlength: 2
  },
  maxCapacity: {
    type: Number,
    required: false,
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
  pinCode: {
    type: Number,
    required: true,
    validate: [validatePin, "Please fill a valid pincode"]
  },
  landmark: {
    type: String,
    required: false
  },
  eventType: {
    //bool // movie // comedy
    movie: Boolean,
    comedy: Boolean
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client"
  },
  amenities: [
    {
      type: String
    }
  ],
  venueContact: {
    type: Number,
    required: true,
    validate: [validatePhone, "Please fill a valid phone number"]
  },
  image: {
    type: String
  },
  status:{
    type: String,
    default: "enabled"
  },
  verified: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Venue", venueSchema);
