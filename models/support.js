const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId;

const supportSchema = new mongoose.Schema({
  issue_subject: {
    type: String,
    required: true
  },
  issue_explanation: {
    type: String,
    required: true
  },
  issue_comment: {
    type: String
  },
  immediate_contact: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    required: true,
    default: "pending"
  },
  clientId: {
    type: ObjectId,
    ref: "Client"
  }
});

module.exports = mongoose.model("Support", supportSchema);
