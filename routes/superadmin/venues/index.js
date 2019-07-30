const router = require('express').Router({mergeParams:true});

router.use('/',require('./RUD'));

module.exports = router;
