const router = require('express').Router({mergeParams:true});

router.use('/',require('./manage'));

module.exports = router;