const router = require("express").Router({ mergeParams: true }),
  Client = require("../../../models/client"),
  EventsNotifications = require("../../../models/eventNotification");

//using async await
router.get("/event", async (req, res, next) => {
  try {
    const client = await Client.findById(req.params.client_id).populate(
      "eventNotifications"
    );
   
    let allNotifications = client.eventNotifications;
    let unreadNotifications = client.eventNotifications.filter( obj => {
      return obj.read == false;
    })

    
    if (req.query.read == "true") res.json(allNotifications);
    else if (req.query.read == "false") res.json(unreadNotifications);
    else if (req.query.read == null) res.json(allNotifications);

  } catch (err) {
    console.log(`error from get event notifications`);
    // res.json(err);
    next(err);
  }
});



//using then catch
// router.get("/event", (req,res,next)=> {
//     Client.findById(req.params.client_id)
//     .populate("eventsNotifications")
//     .then(client => res.json(client))
//     .catch(err => next(err));
// })


//using exec
// router.get("/event", (req,res,next)=> {
//   Client.findById(req.params.client_id)
//   .populate("eventsNotifications")
//   .exec((err,client)=> {
//     if(err) {
//       next(err)
//     } else {
//       res.json(client);
//     }
//   });
// });

module.exports = router;


