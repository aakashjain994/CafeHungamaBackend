//RECTIFY THIS, THERE WAS A WEIRD ERROR IN IMPLEMENTING IT,

const router = require("./node_modules/express").Router(),
   eventType = require("../../../models/eventType");


router.post("/create", async (req, res, next) => {
  try {
    const eventType = await new eventType(req.body).save();

    if (!eventType)
      //may be this way handle err, not sure
      return res.send("There is some error in creating the eventType");

    res.send(eventType);
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

router.put("/:event_type_id/put", async (req, res, next) => {
  try {
    const eventType = await eventType.findByIdAndUpdate(req.params.event_type_id,req.body, {new:true});

    if (!eventType)
      return res.status(404).send("The event with given id was not found");

    res.send(eventType);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.delete("/:event_type_id/delete", async (req, res, next) => {
  try {
    const eventType = await Amenity.findByIdAndRemove(req.params.event_type_id);

    if (!eventType)
      return res.status(404).send("The event with given id was not found");

    res.send(eventType);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
