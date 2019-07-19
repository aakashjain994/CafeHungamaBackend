const router = require('express').Router();

//router.use('/',require('./login'));
router.use('/',require('./profile'));
router.use('/bookings',require('./bookings'));


module.exports = router;