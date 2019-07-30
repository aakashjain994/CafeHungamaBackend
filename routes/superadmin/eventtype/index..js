//RECTIFY THIS, THERE WAS A WEIRD ERROR IN IMPLEMENTING IT,
const router = require('express').Router({mergeParams:true});

router.use('/',require('./CRUD'));


module.exports = router;

