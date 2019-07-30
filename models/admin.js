const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId;

const adminSchema = new Schema({
  pws_password: {
    type: String,
    required: true
  },
  pws_id: {
    type: String,
    required: false
  },
  adminProfile: {
    type: ObjectId,
    ref: "AdminProfile"
  }
}, {timestamps:true} );

module.exports = mongoose.model("Admin", adminSchema);
