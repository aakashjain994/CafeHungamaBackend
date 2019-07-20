const router = require('express').Router();
const Events = require('../../../models/event');
router.get('/:event',(req,res)=>{
    const searchEvent = req.params.event;

    const filterQuery = {
        name:new RegExp(searchEvent,'i')
    }
    Events.find(filterQuery)
    .then(events=>{
        return res.status(200).json({
            events
        })
    })
    .catch(err=>{
        console.log('Error finding events',err);
        return res.status(500).json({msg:'no events found'});
    })


})

module.exports = router;