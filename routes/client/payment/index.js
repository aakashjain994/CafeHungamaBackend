const router = require('express').Router({mergeParams:true});
// router.use('/',require('./monthlyPayment'));  // THEY MAY BE USED IN FUTURE , NOT USED TILL NOW
// router.use('/',require('./tillNow'));

router.use('/',require('./fetch_payment_details'));

module.exports = router;