const router = require('express').Router()
const User = require('../../../models/user');
const uuid = require('uuid/v4')
//const validator = require('validator')

router.post('/', (req, res, next) => {
  if (!req.body) {
    return res.status(400).json({msg: 'Missing required fields'})
  }
//ESCAPING USER INPUT
  /*const firstName = validator.escape(req.body.firstName);
  const lastName = validator.escape()*/
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const location = req.body.location;
  const city = req.body.city;
  const address = req.body.address;
  const contact = req.body.contact;
  console.log(firstName,lastName)

//validation checks need to be done for checking email and etc
  const user = new User({
    _id: uuid(),
    firstName:firstName,
    lastName:lastName,
    email:email,
    password:password,
    location:location,
    city:city,
    address:address,
    contact:contact
  })
  user.save()
  .then(savedUser => {
    return res.status(201).json(savedUser)
  })
  .catch(err => {
    console.log('error saving user:', err)
    return res.status(500).json({msg: 'Error saving user'})
  })

})

// router.get('/', (req, res, next) => {
//   return res.status(200).json({msg: 'user endpoint'})
// })

module.exports = router