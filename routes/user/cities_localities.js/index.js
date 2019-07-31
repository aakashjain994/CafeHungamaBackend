const router = require('express').Router();

router.use('/',require('./get_all_cities_with_localities'));
router.use('/',require('./localities_in_city'));
router.use('/',require('./get_city_names'));

module.exports = router;
