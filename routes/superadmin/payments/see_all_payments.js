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

    const allPayments = await PaymentOfEachClient.find({}).populate("client");

    let newans = [];
    allPayments.forEach(payment => {
      let obj = {
        transaction_id: payment.transaction_id,
        date: payment.date,
        amount: payment.amount,
        opening_balance: payment.opening_balance,
        closing_balance: payment.closing_balance,
        client_firstName: payment.client.firstName,
        client_lastName: payment.client.lastName,
        client_companyName:payment.client.companyName
      };
      newans.push(obj);
    });

    res.json(newans);
  } catch (err) {
    // console.log(err);
    res.status(400).send(err.message);
  }
});

module.exports = router;
