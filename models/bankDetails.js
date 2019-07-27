const mongoose = require('mongoose'),
      Schema   = mongoose.Schema,
      ObjectId = Schema.Types.ObjectId;

const bankDetails = new Schema({
    bank: {
        type: String,
        required: true,
        minlength: 2
    },
    account_no: {
        type: Number,
        unique: true,
        required: true
    },
    ifsc_code: {
        type: String,
        required: true,
    },
    branch: {
        type: String,
        required: true
    },
    contact_no : {
        type: Number,
        required: false,
    },
    clientId: {
        type: ObjectId,
        ref: 'Client'
    }

});

module.exports = mongoose.model("BankDetail",bankDetails)