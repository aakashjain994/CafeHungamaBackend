const router = require('express').Router({mergeParams:true});

router.use('/:client_id/coupons',require('./coupon'));
router.use('/:client_id/bookings',require('./booking'));
router.use('/:client_id/venues',require('./venue'));
router.use('/:client_id/payments',require('./payment'));
router.use('/:client_id/profile',require('./profile'));
router.use('/:client_id/support',require('./support'));
router.use('/:client_id/bankdetails',require('./bankDetails'));
router.use('/:client_id/dashboard',require('./dashboard'));
router.use('/',require('./login'));

module.exports = router;

