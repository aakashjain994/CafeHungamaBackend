const express  = require('express'),
      passport = require('passport'),
      Client   = require('../../models/client'),
      router   = express.Router();
      
//routes

//handling client sign up
router.post("/register", function(req,res){
    console.log("hello");
    console.log(req.headers);
    Client.register(new Client({email: req.body.email}), req.body.password, function(err, Client){
        if(err){
            res.send(err);
        }else{
            passport.authenticate("local")(req,res,function(){
                console.log("hello");
                console.log(req.headers);
                res.status(200).json({message : "successful signup client" })
            });
        }
    });
});

//login logic
router.post("/login",passport.authenticate("local",{
    //successRedirect: "/",
    failureRedirect: "/",
}) ,function(req,res){
    res.status(200).json({message : "successfully logged in client" })
});


module.exports = router;