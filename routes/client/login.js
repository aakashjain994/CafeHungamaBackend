const express  = require('express'),
      passport = require('passport'),
      Client   = require('../../models/client'),
      router   = express.Router();
      
//handling client sign up
router.post("/register", function(req,res){
    Client.create(req.body, function(err, Client){
        if(err){
            res.send(err);
        }else{
                res.status(200).json(`message : "successful signup client" ${Client}`)   
        }
    });
});

module.exports = router;