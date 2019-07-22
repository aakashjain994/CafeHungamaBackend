const routes = require('express').Router({mergeParams:true}),
      adminRoutes  = require('./admin'),
      clientRoutes = require('./client'),
      userRoutes   = require('./user'),
      Venue = require('../models/venue');

routes.use('/admin', adminRoutes);
routes.use('/client', clientRoutes);
routes.use('/user', userRoutes);

routes.get('/', (req,res)=> {
    console.log("hey")
    Venue.find({
        city: "delhi"
    }, (err,docs) => {
        res.json(docs);
    });
});

module.exports = routes;
