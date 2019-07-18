const router = require('express').Router({mergeParams:true});

router.put("/:id", (req,res)=> {
    Venue.findByIdAndUpdate(req.params.id,req.body, (err,updatedVenue)=>{
        if(err){
            console.log(err);
        }else{
            // res.json(UpdatedVenue);
            res.send("updated")
        }
    });
});

// DELETE venueROUTE
router.delete("/:id",function(req,res){
    Venue.findByIdAndDelete(req.params.id, function(err){
        if(err){
            console.log(`deleting error : ${err}`)
        }else{
            res.json("deleted");
        }
    });
});

module.exports = router;