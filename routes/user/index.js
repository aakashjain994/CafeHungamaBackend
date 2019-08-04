const router = require('express').Router();

//router.use('/',require('./login'));
router.use('/',require('./profile'));
router.use('/bookings',verifyToken,require('./bookings'));
router.use('/',require('./auth'));
router.use('/venues',require('./Venues'));
router.use('/amenities',require('./amenities'));
router.use('/cities',require('./cities_localities.js'));
router.use('/orders',require('./orders')); //should verify token here

function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
      // Split at the space
      const bearer = bearerHeader.split(' ');
      // Get token from array
      const bearerToken = bearer[1];
      // Set the token
      req.token = bearerToken;
      // Next middleware
      jwt.verify(req.token,'top_secret',(err,authData)=>{
        if(err){
          res.sendStatus(403);
        }
          else{
            req.user = authData.user;
          }
      })
      next();
    } else {
      // Forbidden
      res.sendStatus(403);
    }
  }

module.exports = router;