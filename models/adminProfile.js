const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId;

const adminProfileSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required : false,
  },
  email: {
    type: String,
    required : true,
  },
  password: {
    type: String,
    required : true,
  },
  contact: {
    type: Number,
    required : true,
  },
  notifications: [
    {
      type: String
    }
  ]
});

module.exports = mongoose.model("AdminProfile", adminProfileSchema);
