const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId;

const eventTypeSchema = new Schema({
    event_type_name: {
        type: String,
        required: true
    }
  
} );

module.exports = mongoose.model("eventType", eventTypeSchema);
 