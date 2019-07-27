const router = require("express").Router({ mergeParams: true }),
  Client = require("../../../models/client");

router.get("/all", async (req, res) => {
  await Client.findById(req.params.client_id)
    .then(foundClient => {
      //concat the 3 arrays of payment, request, event
      let allNotifications = foundClient.eventsNotifications.concat(
        foundClient.requestNotifications,
        foundClient.paymentNotifications
      );
      res.json(allNotifications);
    })
    .catch(err => {
      console.log(`error from get_all notifications`);
      res.json(err);
    });
});

module.exports = router;
