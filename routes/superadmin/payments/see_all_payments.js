const router = require("express").Router(),
  PaymentOfEachClient = require("../../../models/paymentOfEachClient"),
  Client = require("../../../models/client");

const { check, validationResult } = require("express-validator");


//see the list of all clients
router.get("/get", async (req, res, next) => {
    try {
        // not able to apply populate here
    //     let arr = [];
    //   const allClients = await Client.find({});
    //   allClients.forEach(client => {
    //       arr.push(client.paymentDetails)
    //   })

    const allPayments = await PaymentOfEachClient.find({});
      res.json(allPayments);
      
    } catch (err) {
        // console.log(err);
      res.status(400).send(err.message);
    }
  });
  

module.exports = router;