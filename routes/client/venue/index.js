const router = require('express').Router({mergeParams:true});

router.use('/',require('./CR_venue'));

module.exports = router;