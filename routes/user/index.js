const router = require('express').Router();

//router.use('/',require('./login'));
router.use('/',require('./profile'));
router.use('/bookings',require('./bookings'));
router.use('/',require('./auth'));
router.use('/venues',require('./Venues'));
router.use('/amenities',require('./amenities'));

module.exports = router;