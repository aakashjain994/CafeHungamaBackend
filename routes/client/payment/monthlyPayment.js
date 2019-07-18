const express = require('express'), 
      Payment   = require('../../../models/payment'),
      router  = express.Router();


      router.get("/:month_name", (req,res)=> {
        Payment.find({
            client: req.params.client_id,   
        }, (err,docs) => {
            if(err){
                res.send(err);
            }else{
                console.log(docs.month.req.params.month_name);
               res.json(docs.month.req.params.month_name);
            }
        });
    });



module.exports = router;