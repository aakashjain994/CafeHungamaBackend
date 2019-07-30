const router = require("express").Router(),
  AdminProfile = require("../../../models/adminProfile");

const { check, validationResult } = require("express-validator");

router.post("/create", [check("email").isEmail()], async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const email = req.body.email;
    const newAdminProfile = await new AdminProfile(req.body).save();

    if (!newAdminProfile)
      //may be this way handle err, not sure
      return res.send("There is some error in creating the admin");

    res.send(newAdminProfile);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

//see the details of one admin
router.get("/:admin_id/get", async (req, res, next) => {
  try {
    const admin = await AdminProfile.findById(req.params.admin_id);

    if (!admin)
      return res.status(404).send("The admin with given id was not found");

      res.send(admin);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.put("/:admin_id/put", async (req, res, next) => {
  try {
    const admin = await AdminProfile.findByIdAndUpdate(req.params.admin_id,req.body, {new: true});

    if (!admin)
      return res.status(404).send("The admin with given id was not found");

    res.send(admin);
  } catch (err) {
    res.status(400).send(err.message);
  }
});


module.exports = router;
