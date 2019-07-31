const router = require('express').Router({mergeParams:true});

router.use('/',require('./CUD'));


module.exports = router;

