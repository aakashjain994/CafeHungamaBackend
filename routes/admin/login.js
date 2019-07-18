const express  = require('express'),
      passport = require('passport'),
      Admin   = require('../../models/admin'),
      router   = express.Router();
      
//routes

//handling admin sign up
router.post("/register", function(req,res){
    Admin.register(new Admin({email: req.body.email}), req.body.password, function(err, Admin){
        if(err){
            res.send(err);
        }else{
            passport.authenticate("local")(req,res,function(){
                res.status(200).json({message : "successful signup of admin " })
            });
        }
    });
});

//login logic
router.post("/login",passport.authenticate("local",{
    //successRedirect: "/",
    failureRedirect: "/",
}) ,function(req,res){
    res.status(200).json({message : "successfully logged in admin" })
});


module.exports = router;