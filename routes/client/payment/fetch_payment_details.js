const router = require('express').Router({mergeParams:true}),
      Client = require('../../../models/client');

router.get('/get', async(req,res)=> {
    console.log(req.params.client_id);
    Client.findById(req.params.client_id)
    .then(foundClient => {
        res.json(foundClient.paymentDetails);
    })
    .catch(err => {
        res.send(err);
    })
})

module.exports = router;