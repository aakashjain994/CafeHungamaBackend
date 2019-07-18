const mongoose = require("mongoose"),
  Venue = require("./venue"),
  Schema = mongoose.Schema,
  Mixed = Schema.Types.Mixed,
  ObjectId = Schema.Types.ObjectId;

const bookingSchema = Schema({
  //how to ensure combination of venueId & screen is unique
  venueId: {
    type: ObjectId,
    ref: Venue
  },
  screen: {
    type: Number // this should be extracted on frontend from venueID //can it be validated here ?
  },
  maxUsers: {
    type: Number,
    required: true
  },
  desc: {
    type: String,
    required: false
  },
  slot_price_table: {
    type: Mixed,
    day: [
      [
        {
          date: {
            type: Date
          },
          time_slot: {
            type: String
          },
          ticket_sold: {
            type: Number,
            default: 0
          },
          event_type: {
            type: String
          },
          ticket_price: {
            type: Number
          },
          requested_count: {
            type: Number
          },
          confirmed_count: {
            type: Number
          }
        }
      ]
    ]
  },
  clientId: {
    type: ObjectId,
    ref: "Client"
  }
});

bookingSchema.index({ venueId: 1, screen: 1 }, { unique: true });

module.exports = mongoose.model("Booking", bookingSchema);
