const router = require('express').Router();
const Events = require('../../../models/event');
router.get('/',(req,res)=>{
    Events.find({})
    .then(Events=>{
        return res.status(200).json(Events);
    })
    .catch(err=>{
        console.log('error fetching events data',err);
        return res.status(500).json({msg:'internal server error'})
    })
    })

module.exports = router;