const router = require('express').Router({mergeParams:true});

router.use('/:superadmin_id/clients',require('./clients'));


module.exports = router;

