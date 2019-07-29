import { Schema, Mongoose } from "mongoose";

const paymentDetailSchema = new Schema({
  transaction_id: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  opening_balance: {
    type: Number,
    required: true
  },
  closing_balance: {
    type: Number,
    required: true
  }
});

module.exports = Mongoose.model("PaymentDetail", paymentDetailSchema);
