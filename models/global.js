const mongoose = require("mongoose"),
  Client = require("./client");

const globalSchema = new mongoose.Schema({
  date: {
      type: Date,
  },
  total_collection: {
    type: Number,
    default: 0
  },
  tickets_sold: {
    type: Number,
    default: 0
  },
  slots_filled: {
    type: Number,
    default: 0
  },
  new_users_registered: {
    type: Number,
    default: 0
  },
  no_of_switched_users: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("Global", globalSchema);
