const mongoose = require('mongoose'),
      Schema   = mongoose.Schema,
      ObjectId = Schema.Types.ObjectId;

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
  },
  client: {
    type: ObjectId,
    ref: "Client"
  }
});

module.exports = mongoose.model("PaymentDetail", paymentDetailSchema);
