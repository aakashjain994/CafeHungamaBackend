const router = require('express').Router()
const Venues = require('../../../models/venue');
const Bookings = require('../../../models/booking');

router.use('/all', require('./fetchall'))
router.use('/search', require('./search'))

router.get('/:id/:date',async (req,res)=>{
    //console.log(req.params.id);
    const venueId = req.params.id;
    const date = req.params.date;
    //const clientsId = await Venues.findOne({_id:eventId}).select('clientId -_id');
    //console.log(clientsId);
    console.log(venueId,date);
    let arr = date.split('-');
    const month = arr[1];
    const day = arr[2];
    let sum = 0;
    const months = [0,31,28,31,30,31,30,31,31,30,31,30,31];
    for(let s = 0;s <=parseInt(month)-1;++s){
        sum += months[s];
      }
    const days = sum + parseInt(day);

    Bookings.findOne({venueId:venueId}).select('slot_price_table').then(venues=>{
        //filter according to the date
        console.log(days);
        return res.status(200).json(venues.slot_price_table[1]);
        //actually ot should be days venues.slot_price_table[days];

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