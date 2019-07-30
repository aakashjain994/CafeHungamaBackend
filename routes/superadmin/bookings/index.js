const router = require('express').Router({mergeParams:true});

router.use('/',require('./manage_table1'));


module.exports = router;

