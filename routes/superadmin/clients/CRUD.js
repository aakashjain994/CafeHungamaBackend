const router = require("express").Router(),
  Admin = require("../../../models/admin"),
  Client = require("../../../models/client");

const { check, validationResult } = require("express-validator");

router.post("/create", [check("email").isEmail()], async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const email = req.body.email;
    const newClient = await new Client(req.body).save();

    if (!newClient)
      //may be this way handle err, not sure
      return res.send("There is some error in creating the client");

    res.send(newClient);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

//see the list of all clients
router.get("/get", async (req, res, next) => {
  try {
    const allClients = await Client.find({});
    res.send(allClients);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

//see the details of one client
router.get("/:client_id/get", async (req, res, next) => {
  try {
        console.log("yes here")
    const client = await Client.findById(req.params.client_id);

    if (!client)
      return res.status(404).send("The client with given id was not found");

      res.send(client);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.put("/:client_id/put", async (req, res, next) => {
  try {
    const client = await Client.findByIdAndUpdate(req.params.client_id,req.body);

    if (!client)
      return res.status(404).send("The client with given id was not found");

    res.send(client);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.delete("/:client_id/delete", async (req, res, next) => {
  try {
    const client = await Client.findByIdAndRemove(req.params.client_id);

    if (!client)
      return res.status(404).send("The client with given id was not found");

    res.send(client);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
