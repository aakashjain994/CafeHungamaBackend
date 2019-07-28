const router = require("express").Router({ mergeParams: true }),
  Client = require("../../../models/client"),
  RequestNotification = require("../../../models/requestNotification");

//using async await
router.get("/request", async (req, res, next) => {
  try {
    const client = await Client.findById(req.params.client_id).populate(
      "requestNotifications"
    );
    let allNotifications = client.requestNotifications;
    let unreadNotifications = client.requestNotifications.filter(obj => {
      return obj.read == false;
    });

    if (req.query.read == "true") res.json(allNotifications);
    else if (req.query.read == "false") res.json(unreadNotifications);
    else if (req.query.read == null) res.json(allNotifications);
  } catch (err) {
    console.log(`error from get request notifications`);
    // res.json(err);
    next(err);
  }
});

module.exports = router;
