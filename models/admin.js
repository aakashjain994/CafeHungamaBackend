const mongoose = require('mongoose'),
      passportLocalMongoose = require('passport-local-mongoose');

const adminSchema = new mongoose.Schema({
    firstName: {
        type: String,
        //required: true
    },
    lastName : {
        type : String,
        //required : false
    },
    discount : {
        type : Number,
        //required : true
    },
    email : {
        type : String,
        //required : true
    },
    password :{
        type : String,
        //required : true
    },
    contact : {
        type : Number,
        //required : true,
    }
});

adminSchema.plugin(passportLocalMongoose,{ usernameField : 'email' });

module.exports = mongoose.model("Admin",adminSchema);

