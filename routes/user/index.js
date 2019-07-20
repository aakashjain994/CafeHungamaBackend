const router = require('express').Router();

//router.use('/',require('./login'));
router.use('/',require('./profile'));
router.use('/bookings',require('./bookings'));
router.use('/events',require('./events'));

module.exports = router;