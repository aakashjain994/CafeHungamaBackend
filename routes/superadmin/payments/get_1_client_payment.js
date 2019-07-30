const router = require("express").Router(),
  PaymentOfEachClient = require("../../../models/paymentOfEachClient"),
  Client = require("../../../models/client")


  //see the details of one client
  router.get("/:client_id/get", async (req, res, next) => {
    try {
      const client = await Client.findById(req.params.client_id)
      .populate("paymentDetails");
  
      if (!client)
        return res.status(404).send("The client with given id was not found");

        res.send({paymentDetails: client.paymentDetails,firstName: client.firstName,lastName: client.lastName,companyName: client.companyName})
  
        
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
  