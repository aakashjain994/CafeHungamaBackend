const router = require('express').Router({mergeParams:true});

router.use('/',require('./CR'));

module.exports = router;