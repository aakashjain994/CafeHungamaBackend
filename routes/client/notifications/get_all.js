const router = require("express").Router({ mergeParams: true }),
  Client = require("../../../models/client");

router.get("/all", (req, res) => {
  Client.findById(req.params.client_id)
    .populate("eventNotifications")
    .populate("paymentNotifications")
    .populate("requestNotifications")
    .then(foundClient => {
      //concat the 3 arrays of payment, request, event
      let allNotifications = foundClient.eventNotifications.concat(
        foundClient.requestNotifications,
        foundClient.paymentNotifications
      );

      let allUnreadNotifications = allNotifications.filter(obj => {
        return obj.read == false;
      });

      console.log(req.query)

      if (req.query.read == "true") res.json(allNotifications);
      else if (req.query.read == "false") res.json(allUnreadNotifications);
      else if (req.query.read == null) res.json(allNotifications);
    })
    .catch(err => {
      console.log(`error from get_all notifications`);
      res.json(err);
    });
});

module.exports = router;
