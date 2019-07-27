const router = require("express").Router({ mergeParams: true }),
  BankDetails = require("../../../models/bankDetails"),
  Client = require("../../../models/client");

//see bankDetails by client id
router.get("/", (req, res) => {
  console.log("finding client id");
  BankDetails.find(
    {
      clientId: req.params.client_id
    },
    function(err, allBankDetails) {
      if (err) {
        console.log(err);
      } else {
        res.json(allBankDetails);
      }
    }
  );
});

//after auth req.user will have the authenticated user
router.post("/", (req, res) => {
  // console.log(req.params);
  const { bank, account_no, branch, ifsc_code, contact_no} = req.body;
  const newBankDetails = {
    bank,
    account_no,
    ifsc_code,
    contact_no,
    branch,
    clientId: req.params.client_id
  };

  Client.findById(req.params.client_id, (err, client) => {
    if (err) {
      res.send(err);
    } else {
      BankDetails.create(newBankDetails, (err, newlyCreated) => {
        if (err) {
          res.send(err);
          console.log(`error from new BankDetails adding: ${err}`);
        } else {
          client.bankdetails.push(newlyCreated);
          client.save();
          res.json(newlyCreated);
        }
      });
    }
  });
});

// router.put("/:bankdetail_id", (req, res) => {
//     console.log("pahoceh")
//     console.log(req.params.bankdetail_id)
//     BankDetails.findByIdAndUpdate(req.params.bankdetail_id, (err, foundBankDetail) => {
//       if (err) {
//         res.send(err);
//       } else {
//          res.send("updated");
//       }
//     });
//   });

//DELETE COMMENT
router.delete("/:bankdetail_id", (req, res) => {
  BankDetails.findByIdAndRemove(req.params.bankdetail_id, function(err) {
    if (err) {
      res.send(err);
      console.log(err);
    } else {
      res.send("deleted");
    }
  });
});

module.exports = router;
