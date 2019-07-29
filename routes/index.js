const routes = require('express').Router({mergeParams:true}),
      adminRoutes  = require('./admin'),
      clientRoutes = require('./client'),
      userRoutes   = require('./user'),
      superAdminRoutes = require('./superadmin'),
      Venue = require('../models/venue');

routes.use('/admin', adminRoutes);
routes.use('/client', clientRoutes);
routes.use('/user', userRoutes);
routes.use('/superadmin', superAdminRoutes);

routes.get('/', (req,res)=> {
    res.json("Home page")
});

module.exports = routes;
