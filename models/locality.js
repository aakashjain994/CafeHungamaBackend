const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId;

const localitySchema = new Schema({
  locality: {
    type: String,
    lowercase: true,
    unique: true,
  },
  city_id: {
      type: ObjectId,
      ref: "City",
  }
});

module.exports = mongoose.model("Locality", localitySchema);
