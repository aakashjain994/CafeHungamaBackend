const router = require("express").Router({ mergeParams: true }),
  Client = require("../../../models/client");

router.get("/request", async (req, res) => {
  await Client.findById(req.params.client_id)
    .then(foundClient => {
      res.json(foundClient.requestNotifications);
    })
    .catch(err => {
      console.log(`error from get request notifications`);
      res.json(err);
    });
});

module.exports = router;
