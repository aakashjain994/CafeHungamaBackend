const router = require('express').Router();
const Venues = require('../../../models/venue');
const Bookings = require('../../../models/booking');
router.post('/',async (req,res)=>{
    const VenueLocation = req.body.location;
    const Date = req.body.date;
    const EventType = req.body.eventType;
    /*const filterQuery = {
        name:new RegExp(searchEvent,'i')
    }*/
    const regex = new RegExp(VenueLocation,'i');
    const venues = await Bookings.find({}).populate('venueId');
    const filteredVenues = venues.filter((venue)=>{
        try{
            if(regex.test(venue.venueId.city)){
                console.log(venue.venueId.eventType,EventType);
                if(JSON.stringify(venue.venueId.eventType)===JSON.stringify(EventType)){
                    return true;
                    /*should compare dates*/
                }
            }
        }
        catch(Error){
            console.log('error');
        }
    });
    console.log(filteredVenues);
    return res.status(200).json({filteredVenues})
  /*  Venues.find({city:VenueLocation,eventType:EventType})
    .then(venues=>{
        return res.status(200).json({
            venues
        })
    })
    .catch(err=>{
        console.log('Error finding events',err);
        return res.status(500).json({msg:'no events found'});
    })*/


})

module.exports = router;