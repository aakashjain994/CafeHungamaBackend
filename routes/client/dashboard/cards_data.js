//client/dashboard/:client_id/stats

//1. total successfull events done by a client   //count from Client model the number of events in event array having state successfull
//2. total upcoming events           // same
//3. cancelled events                // same
//4. total business done             // extract from payment model
//5. no of venues registered         // extract from client model
//6. total tickets sold              // extract from client model -> events -> successfull events -> count of tickets added
//7.
//8.

const router = require("express").Router({ mergeParams: true }),
      Client = require("../../../models/client");

router.get("/stats", async (req, res) => {
  await Client.findById(req.params.client_id)
    .then(foundClient => {
      //make an obj of all the data required
      let obj = {
          "total_successful_events" : "dummy for now", //it may change after harish's users endcode
          "total_upcoming_events" : "dummy for now", 
          "total_cancelled_events" : "dummy for now",
          "total_business_done" : "dummy for now",
          "total_venues_registered" : foundClient.venues.length,
          "total_tickets_sold" : "dummy for now"
      }
      res.json(obj);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
