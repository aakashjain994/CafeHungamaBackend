const router = require('express').Router({mergeParams:true});

router.use('/:superadmin_id/clients',require('./clients'));
router.use('/:superadmin_id/admins',require('./admins'));


module.exports = router;

