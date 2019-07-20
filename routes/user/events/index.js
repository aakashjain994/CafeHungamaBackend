const router = require('express').Router()
const Events = require('../../../models/event');
router.use('/all', require('./fetchall'))
router.use('/search', require('./search'))

router.get('/:id',(req,res)=>{
    //console.log(req.params.id);
    const eventId = req.params.id;
    Events.findOne({_id:eventId})
    .then(Events=>{
        return res.status(200).json(Events);
    })
    .catch(err=>{
        console.log('error fetching events data',err);
        return res.status(500).json({msg:'internal server error'})
    })
    })


module.exports = router

//should add filtering based on the price range
//Rating sort by distance based on searching through a particular place
//Added only filtering based only on searching through events