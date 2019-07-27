const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId;

const adminSchema = new Schema({
  firstName: {
    type: String
    //required: true
  },
  lastName: {
    type: String
    //required : false
  },
  discount: {
    type: Number
    //required : true
  },
  email: {
    type: String
    //required : true
  },
  password: {
    type: String
    //required : true
  },
  contact: {
    type: Number
    //required : true,
  },
  notifications: [
    {
      type: String
    }
  ]
});

module.exports = mongoose.model("Admin", adminSchema);
