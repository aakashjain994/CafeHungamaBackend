const router = require("express").Router({ mergeParams: true }),
  Client = require("../../../models/client");

router.get("/payment", async (req, res) => {
  await Client.findById(req.params.client_id)
    .then(foundClient => {
        res.json(foundClient.paymentNotifications);
    })
    .catch(err => {
      console.log(`error from get payment notifications`);
      res.json(err);
    });
});

module.exports = router;
