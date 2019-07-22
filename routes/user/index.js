const router = require('express').Router();

//router.use('/',require('./login'));
router.use('/bookings',require('./bookings'));
router.use('/',require('./auth'));


module.exports = router;
