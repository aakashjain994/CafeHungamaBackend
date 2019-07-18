const router = require('express').Router();

//router.use('/',require('./login'));
router.use('/',require('./get_all_list'));
router.use('/',require('./result_by_filters'));

module.exports = router;
