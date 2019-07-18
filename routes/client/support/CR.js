const router = require("express").Router({ mergeParams: true }),
  Support = require("../../../models/support"),
  Client = require("../../../models/client");

//see support by client id
router.get("/", (req, res) => {
  Support.find(
    {
      clientId: req.params.client_id
    },
    function(err, allQueries) {
      if (err) {
        console.log(err);
      } else {
        res.json(allQueries);
      }
    }
  );
});

//after auth req.user will have the authenticated user
router.post("/", (req, res) => {
  console.log(req.params);
  const {
    issue_subject,
    issue_explanation,
    issue_comment,
    immediate_contact
  } = req.body;
  const newSupport = {
    issue_subject,
    issue_explanation,
    issue_comment,
    immediate_contact,
    clientId: req.params.client_id
  };

  Client.findById(req.params.client_id, (err, client) => {
    if (err) {
      res.send(err);
    } else {
      Support.create(newSupport, (err, newlyCreated) => {
        if (err) {
          res.send(err);
          console.log(`error from new support adding: ${err}`);
        } else {
          client.queries.push(newlyCreated);
          client.save();
          res.json(newlyCreated);
        }
      });
    }
  });
});

module.exports = router;
