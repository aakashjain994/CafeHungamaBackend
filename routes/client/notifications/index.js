const router = require('express').Router({mergeParams:true});

router.use('/',require('./get_all'));
router.use('/',require('./payment'));
router.use('/',require('./event'));
router.use('/',require('./request'));

module.exports = router;

// I have made the notifications arrays - events,request,payments - but notifications are not being added to them dynamically. 
// To events - it will done by users backend.
// To requests - when admin verifies the venue 
// To payments - when payment action is taken by admin