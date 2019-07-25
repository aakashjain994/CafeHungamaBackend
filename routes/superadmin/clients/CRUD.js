const router = require('express').Router(),
      Admin  = require('../../../models'),
      Client = require('../../../models/client');

//Admin creating a client & that client being pushed to admin's createdClients
router.post('/:admin_id/create' , async(req,res)=> {
     await Admin.findById(req.params.admin_id)
     .then( admin => {
        
     });
});

module.exports = router