const router = require('express').Router()

router.use('/create', require('./create'))
router.use('/read', require('./read'))
router.use('/update', require('./update'))
router.use('/delete', require('./delete'))

module.exports = router