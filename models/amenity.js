const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId;

const amenitySchema = new Schema({
    amenity_name: {
        type: String,
        required: true
    }
  
} );

module.exports = mongoose.model("Amenity", amenitySchema);
 