const router = require("express").Router(),
  Admin = require("../../../models/admin"),
  adminProfile = require("../../../models/adminProfile");

router.post("/create", async (req, res, next) => {
  try {
    const newAdmin = await new Admin(req.body).save();
    if (!newAdmin)     //may be this way handle err, not sure
      return res.send("There is some error in creating the Admin");

    res.send(newAdmin);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

//see the list of all Admins
router.get("/get", async (req, res, next) => {
  try {
    const allAdmins = await Admin.find({}).populate("adminProfile");
    res.send(allAdmins);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

//see the details of one admin
router.get("/:admin_id/get", async (req, res, next) => {
  try {
    // console.log("yes here");
    const admin = await Admin.findById(req.params.admin_id).populate("adminProfile");

    if (!admin)
      return res.status(404).send("The admin with given id was not found");

    res.send(admin);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.put("/:admin_id/put", async (req, res, next) => {
  try {
    const admin = await Admin.findByIdAndUpdate(req.params.admin_id, req.body , {new:true});

    if (!admin)
      return res.status(404).send("The admin with given id was not found");

    res.send(admin);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.delete("/:admin_id/delete", async (req, res, next) => {
  try {
    const admin = await Admin.findByIdAndRemove(req.params.admin_id);

    if (!admin)
      return res.status(404).send("The admin with given id was not found");

    res.send(admin);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
