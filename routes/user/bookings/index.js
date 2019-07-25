const router = require('express').Router();

//router.use('/',require('./login'));
router.use('/',require('./get_all_list'));
//router.use('/',require('./result_by_filters'));
router.use('/new',require('./book_ticket'));
module.exports = router;
