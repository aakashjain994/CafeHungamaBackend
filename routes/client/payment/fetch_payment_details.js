const router = require('express').Router({mergeParams:true}),
      Client = require('../../../models/client'),
      paymentDetails = require('../../../models/paymentOfEachClient');

router.get('/get', async(req,res)=> {
    // console.log(req.params.client_id);
    await Client.findById(req.params.client_id).populate("paymentDetails")
    .then(foundClient => {
        res.json(foundClient.paymentDetails);
    })
    .catch(err => {
        res.send(err);
    })
})

module.exports = router;