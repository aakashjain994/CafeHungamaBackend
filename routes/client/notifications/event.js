const router = require("express").Router({ mergeParams: true }),
  Client = require("../../../models/client");

router.get("/event", async (req, res) => {
  await Client.findById(req.params.client_id)
    .then(foundClient => {
      res.json(foundClient.eventsNotifications);
    })
    .catch(err => {
      console.log(`error from get event notifications`);
      res.json(err);
    });
});

module.exports = router;
