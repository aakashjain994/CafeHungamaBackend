const router = require('express').Router({mergeParams:true});

router.use('/',require('./cards_data'));

module.exports = router;