const router = require('express').Router({mergeParams:true});

router.use('/',require('./get_all'));
router.use('/',require('./payment'));
router.use('/',require('./event'));
router.use('/',require('./request'));

module.exports = router;