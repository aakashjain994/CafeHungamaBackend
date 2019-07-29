const router = require("express").Router(),
  PaymentOfEachClient = require("../../../models/paymentOfEachClient"),
  Client = require("../../../models/client");

const { check, validationResult } = require("express-validator");


//make payment for a client with given id & also add it to payment array in clients model
router.post("/:client_id/add", async (req, res, next) => {
  try {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(422).json({ errors: errors.array() });
    // }
    const foundClient = await Client.findById(req.params.client_id);

      //may be this way handle err, not sure
    if (!foundClient) 
      return res.send("The client with given id doesnt exist");

    const newPayment = await new PaymentOfEachClient({
      transaction_id: req.body.transaction_id,
      date: req.body.date,
      amount: req.body.amount,
      opening_balance: req.body.opening_balance,
      closing_balance: req.body.closing_balance,
      client: req.params.client_id
    }).save();
    if(!newPayment)
      return res.send("payment could not be created");

      foundClient.paymentDetails.push(newPayment);
      foundClient.save();

      res.json(newPayment);

  } catch (err) {
    res.status(400).send(err.message);
  }
});


module.exports = router;
