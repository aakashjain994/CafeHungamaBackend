const router = require('express').Router()
const User = require('../../../models/user');
//const validator = require('validator');
const uuid = require('uuid/v4');


router.put('/', (req, res, next) => {
    const userId = req.user._id;

    /*if (!validator.isUUID(userId)) {
      return res.status(400).json({msg: 'Invalid ID'})
    }*/
    /*const escpQuery = Object.assign({}, ...Object.keys(req.body).map(obKey => {
      return {[obKey]: validator.escape(req.body[obKey])}
    }))*/
    const updatedUser = req.body;
    User.findOneAndUpdate({_id: userId},updatedUser, {new: true})
    .then(updatedUser => {
      return res.status(200).json(updatedUser)
    })
    .catch(err => {
      console.log('error updating user:', err)
      return res.status(500).json({msg: 'Failed to update user'})
    })
  })

module.exports = router