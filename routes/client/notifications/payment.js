const router = require("express").Router({ mergeParams: true }),
  Client = require("../../../models/client"),
  PaymentNotifications = require("../../../models/paymentNotification");

router.get("/payment", async (req, res, next) => {
  try {
    const client = await Client.findById(req.params.client_id).populate(
      "paymentNotifications"
    );
    let allNotifications = client.paymentNotifications;
    let unreadNotifications = client.paymentNotifications.filter(obj => {
      return obj.read == false;
    });

    if (req.query.read == "true") res.json(allNotifications);
    else if (req.query.read == "false") res.json(unreadNotifications);
    else if (req.query.read == null) res.json(allNotifications);
  } catch (err) {
    console.log(`error from get payment notifications`);
    // res.json(err);
    next(err);
  }
});

module.exports = router;
