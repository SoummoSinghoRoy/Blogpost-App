const router = require('express').Router();
const {body} = require('express-validator');

const Usermodel = require('../models/User');

const {
  signupGetController,
  signupPostController,
  loginGetController,
  loginPostController,
  logoutController
} = require('../controllers/authController');

const signupValidator = [
  body('username')
      .isLength({min: 2, max: 15}).withMessage(`Username must be between 2 to 15 chars!`)
      .trim()
      .custom(async username => {
        let user = await Usermodel.findOne({ username })
        if(user) {
          return Promise.reject(`Username already exist`)
        } 
      })
  ,
  body('email')
      .isEmail().withMessage(`Email must be valid`)
      .custom(async email => {
        let emailAdd = await Usermodel.findOne({ email })
        if(emailAdd) {
          return Promise.reject(`Email already exist`)
        }
      })
      .normalizeEmail()
  ,
  body('password')
      .isLength({min: 5}).withMessage(`Password must be greater than 5 chars`)
  ,
  body('confirmPassword')
      .custom( (confirmPassword, {req}) => {
        if(confirmPassword !== req.body.password) {
          throw new Error(`Password doesn't match`)
        }
      })
];

router.get('/signup', signupValidator, signupGetController);
router.post('/signup', signupPostController);

router.get('/login', loginGetController);
router.post('/login', loginPostController);

router.get('/logout', logoutController);

module.exports = router;

// router er controller ache authController e.

// 14.10 Get Error Message From Signup Form -- eta niye kal kaj kora hobe.