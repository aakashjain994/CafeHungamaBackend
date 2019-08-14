const router = require('express').Router()
const User = require('../../../models/user');
const uuid = require('uuid/v4');


router.get('/', (req, res, next) => {
    console.log(req.user);
    const userId = req.user._id;

    /*if (!validator.isUUID(userId)) {
      return res.status(400).json({msg: 'Invalid ID'})
    }*/
    /*const escpQuery = Object.assign({}, ...Object.keys(req.body).map(obKey => {
      return {[obKey]: validator.escape(req.body[obKey])}
    }))*/

    User.findOne({_id: userId})
    .then(User => {
      return res.status(200).json(User);
    })
    .catch(err => {
      console.log('error finding user:', err)
      return res.status(500).json({msg: 'Failed to find user'})
    })
  })
module.exports = router