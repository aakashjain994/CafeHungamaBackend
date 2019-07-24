const express = require('express'),
      router = express.Router({mergeParams:true}),
      Client = require('../../../models/client');

router.get('/', (req,res) => {
    Client.findById(req.params.client_id, (err,foundClient)=>{
        if(err)
        {
            console.log(`err from CRUD client profile 1`);
            res.send(err);
        }
        else
        {
            res.json(foundClient);
        }
    });
});


router.put('/', (req,res)=> {
    Client.findByIdAndUpdate(req.params.client_id, req.body, (err,updatedProfile)=> {
        if(err){
            console.log(err);
        }else{
            // res.json(updatedProfile);
            res.send("updated")
        }
    })
})

module.exports = router;