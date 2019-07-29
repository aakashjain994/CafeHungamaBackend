const router = require('express').Router({mergeParams:true});

router.use('/',require('./CRUD'));
router.use('/',require('./filter'));


module.exports = router;

