const router = require('express').Router({mergeParams:true});

router.use('/',require('./CRUD'));

module.exports = router;