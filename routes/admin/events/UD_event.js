const router = require('express').Router();

router.get('/book', (req,res) => {
    res.send("hello admin");
})

module.exports = router;