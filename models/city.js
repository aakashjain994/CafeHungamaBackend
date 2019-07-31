const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId;

const citySchema = new Schema({
  city: {
    type: String,
    lowercase: true
  },
  localities: [
    {
      type: ObjectId,
      ref: "Locality"
    }
  ],
});

module.exports = mongoose.model("City", citySchema);
