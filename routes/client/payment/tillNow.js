const express = require('express'), 
      Payment   = require('../../../models/payment'),
      router  = express.Router();


      router.get("/:clientId/paymentSummary", (req,res)=> {
        Payment.findOne({
            client: req.params.clientId,   
        }, (err,docs) => {
            if(err){
                res.send(err);
            }else{
                console.log("till now is a js function which has to be made");
            //    res.json({
            //        "dues": docs.dues,
            //        "donePay": docs.donePay,
            //        "totalPay": docs.dues + docs.donePay
            //     });
            res.json(docs)
            }
        });
    });



module.exports = router;