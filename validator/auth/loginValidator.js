// 14.14 Login Validator -- authroute theke validation ke alada korechi.

const {body} = require('express-validator');

/*const Usermodel = require('../../models/User');

module.exports = [
  body('email')
      .custom(async email => {
        let emailAdd = await Usermodel.findOne({email})
        if(!emailAdd) {
          return Promise.reject(`Email is wrong. use correct email!`)
        }
      })
  ,
  body('password')
      .custom(async password => {
        let userPassword = await Usermodel.findOne({password})
        if(!userPassword) {
          return Promise.reject(`Password doesn't correct`)
        }
      })
];*/ // eta charao aro ek vabe korte pari, evabe korle jeta hoi email, password valid kina eta check kora jai. but log in er jonyo eta na korleo chole. ekhetre ja korte pari ta niche kora holo

module.exports = [
  body('email')
      .not().isEmpty().withMessage(`Email can't be empty`),
  body('password')
      .not().isEmpty().withMessage(`Password can't be empty`)
]

// 15.1 How Authentication works
// 15.2 What is Cookie
// 15.3 Create and Using Cookie -- etar kaj korechi authcontroller.js e.