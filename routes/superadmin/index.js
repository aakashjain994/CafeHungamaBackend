const router = require('express').Router({mergeParams:true});
const eventtype = require('../../models/eventType');
router.use('/:superadmin_id/clients',require('./clients'));
router.use('/:superadmin_id/admins',require('./admins'));
router.use('/:superadmin_id/payments',require('./payments'));
router.use('/:superadmin_id/bookings',require('./bookings'));
router.use('/:superadmin_id/venues',require('./venues'));
router.use('/:superadmin_id/amenities',require('./amenities'));
router.use('/:superadmin_id/cities',require('./city'));
router.use('/:superadmin_id/localities',require('./locality'));
router.use('/:superadmin_id/events',require('../../models/eventType'));

module.exports = router;

