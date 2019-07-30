const router = require("express").Router(),
  Amenity = require("../../../models/amenity");


router.post("/create", async (req, res, next) => {
  try {
    const newAmenity = await new Amenity(req.body).save();

    if (!newAmenity)
      //may be this way handle err, not sure
      return res.send("There is some error in creating the amenity");

    res.send(newAmenity);
  } catch (err) {
    res.status(400).send(err.message);
  }
});



//see the details of one amenity
// router.get("/:amenity_id/get", async (req, res, next) => {
//   try {
//         console.log("yes here")
//     const amenity = await Amenity.findById(req.params.amenity_id);

//     if (!amenity)
//       return res.status(404).send("The amenity with given id was not found");

//       res.send(amenity);
//   } catch (err) {
//     res.status(400).send(err.message);
//   }
// });

router.put("/:amenity_id/put", async (req, res, next) => {
  try {
    const amenity = await Amenity.findByIdAndUpdate(req.params.amenity_id,req.body, {new:true});

    if (!amenity)
      return res.status(404).send("The amenity with given id was not found");

    res.send(amenity);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.delete("/:amenity_id/delete", async (req, res, next) => {
  try {
    const amenity = await Amenity.findByIdAndRemove(req.params.amenity_id);

    if (!amenity)
      return res.status(404).send("The amenity with given id was not found");

    res.send(amenity);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
