const router = require('express').Router({mergeParams:true});

router.use('/',require('./add_payment'));
router.use('/',require('./get_1_client_payment'));
router.use('/',require('./see_all_payments'));



module.exports = router;

