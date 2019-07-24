const router = require('express').Router();
const Venues = require('../../../models/venue');



router.get('/',(req,res)=>{
    Venues.find({})
    .then(venues=>{
        return res.status(200).json(venues);
    })
    .catch(err=>{
        console.log('error fetching events data',err);
        return res.status(500).json({msg:'internal server error'})
    })
    })

module.exports = router;