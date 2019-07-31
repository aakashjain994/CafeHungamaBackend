const router = require('express').Router();

//router.use('/',require('./login'));
router.use('/',require('./profile'));
router.use('/bookings',require('./bookings'));
router.use('/',require('./auth'));
router.use('/venues',require('./Venues'));
router.use('/amenities',require('./amenities'));
router.use('/cities',require('./cities_localities.js'));

module.exports = router;