const router = require('express').Router();

//router.use('/',require('./CRUD_bank_details'));
router.use('/',require('./monthlyPayment'));
router.use('/',require('./tillNow'));


module.exports = router;