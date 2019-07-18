const express = require('express'), 
      Coupon   = require('../../../models/coupon'),
      router  = express.Router();

router.get("/", (req,res) => {
    Coupon.find({},function(err,allCoupons){
        if(err){
            console.log(err);
        }else{
            //res.render("client/coupon/index", {coupons: allCoupons});
            res.json(allCoupons);
        }
    });
});


// router.get("/client/coupons/new", (req,res) => {
//     res.render("client/coupon/new"); 
//  }); 

router.post("/", (req,res) => { 
    Coupon.create(req.body, (err,newCoupon)=> {
        if(err){
            console.log(`error from new Couponadding: ${err}`);
        }else{
           // console.log(newCoupon);
           // res.redirect("/client/Coupons");
           res.json(newCoupon);
        }   
    });   
});

// router.get("/client/coupons/:id", (req,res) => {
//     Coupon.findById(req.params.id, (err,foundCoupon)=> {
//         if(err){
//             console.log(err);
//         }else{
//             //console.log(foundCoupon)
//             res.render("client/coupon/show",{coupon: foundCoupon});
//         }
//     });
// });

//edit Couponroute
// router.get("/client/coupon/:id/edit", (req,res)=> {
//     Coupon.findById(req.params.id, (err,foundCoupon)=>{
//        if(err){
//            res.redirect("/client/coupons/" + req.params.id);
//            console.log(err);
//        }else{
//            console.log(foundCoupon);
//            res.render("client/coupon/edit", {coupon: foundCoupon});
//        }
//     });
// });

router.put("/:id", (req,res)=> {
    Coupon.findByIdAndUpdate(req.params.id,req.body, (err,foundCoupon)=>{
        if(err){
            console.log(err);
        }else{
            //res.redirect("/client/coupons/" + req.params.id);
            res.json("updated");
        }
    });
});

// DELETE couponROUTE
router.delete("/:id",function(req,res){
    Coupon.findByIdAndDelete(req.params.id, function(err){
        if(err){
            console.log(`deleting error : ${err}`)
           // res.redirect("/client/coupons");
        }else{
            //res.redirect("/client/coupons");
            res.json("deleted");
        }
    });
});

module.exports = router;