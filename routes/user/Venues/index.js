const router = require('express').Router()
const Venues = require('../../../models/venue');
const Bookings = require('../../../models/booking');

router.use('/all', require('./fetchall'))
router.use('/search', require('./search'))

router.get('/:id',async (req,res)=>{
    //console.log(req.params.id);
    const venueId = req.params.id;
    //const clientsId = await Venues.findOne({_id:eventId}).select('clientId -_id');
    //console.log(clientsId);
    Bookings.find({venueId:venueId}).then(venues=>{
        return res.status(200).json(venues);
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