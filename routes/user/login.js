const express  = require('express'),
      passport = require('passport'),
      User     = require('../../models/user'),
      router   = express.Router();
      
//routes

//handling user sign up
router.post("/register", function(req,res){
    User.register(new User({email: req.body.email}), req.body.password, function(err, User){
        if(err){
            res.send(err);
        }else{
            passport.authenticate("local")(req,res,function(){
                res.status(200).json({message : "successful signup user" })
            });
        }
    });
});

//login logic
router.post("/login",passport.authenticate("local",{
    //successRedirect: "/",
    failureRedirect: "/",
}) ,function(req,res){
    res.status(200).json({message : "successfully logged in user" })
});


module.exports = router;