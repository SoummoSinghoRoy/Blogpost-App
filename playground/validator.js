// 14.4 Create Playground for Validator -- valdation kaj korar jonyo je page gulo drkr tar jonyo views er modhye alada playground namok ar ekta folder rekhechi. jodi real project e evabe hobe na. sekhar jonyo evabe korchi.

const router = require('express').Router();
const {check, validationResult} = require('express-validator');
const flash = require('../utils/Flash');

router.get('/validator', (req,res,next)=>{
  console.log(flash.getMessage(req));

  res.render('../views/playground/signup', {title: 'validator playground'});
})

router.post('/validator', 
[
  check('username')
      .not()
      .isEmpty()
      .withMessage(`username can't be empty`)
      .isLength({max: 15})
      .withMessage(`username can't greater than 15`)
      .trim(),
  check('email')
      .isEmail()
      .withMessage(`provide a valid email`)
      .normalizeEmail(),
  check('password')
      .custom(value => {
        if(value.length < 5){
          throw new Error(`password length must be greater than 5`)
        }
        return true
      }),
  check('confirmPassword')
      .custom((value, {req}) =>{
        if(value !== req.body.password) {
          throw new Error(`password doesn't match`)
        }
        return true
      })
],
(req,res,next)=>{
  let errors = validationResult(req);
  if(!errors.isEmpty()) {
    req.flash('fail', 'Something happend wrong!')
  } else {
    req.flash('success', 'User create succefully!')
  }
  res.redirect('/playground/validator')
})

module.exports = router;

// 14.5 Validation Check with Error Message
// 14.6 Error Message with Formatter 
// 14.7 Custom validation 
// 14.8 sanitizer 
/* amra learning purpose e playground diye kaj korchilam kintu ekhon ar drkr na thakai index.js theke remove kore niyechi */
// 14.9 Signup Validator -- er jonyo kaj kora hoyeche routes directory'r authRoute.js e.

// purbey connect flash setup korechi & usage ta dekhechi.
// 16.3 Create Flash Class -- etar jonyo utils directory te Flash.js namok class type module create korechi sekhane kaj korechi.
// 16.4 Using Flash in Our Project -- etar jonyo kaj kora hoyeche views folder er partials folder er modhye alert.ejs naam e ekta file e, tarpor Flash.js class object ke controller er file e import korechi.
//16.5 Test Flash Message 
// 16.6 Checking Environment -- project ki development naki production mode e ache tai check kora hocche index.js theke.
// 16.7 Using Environment Variables
// 16.8 Using Dotenv -- Dotenv module ta import kora hoyeche index.js e & .env namok ekta file create kora hoyeche jeta configure hobe dotenv'r sathe.
// 16.9 Setup Configuration File -- er jonyo config folder er modhye config.js namok file e sokol kaj kora hoyeche.

// 16.10 Using Config Module -- etar kaj korechi config folder er default.json namok file e, ekhane sokol prokar default configuration thakbe & import korechi index.js e. opor dike development & production environment er jonyo production.json & development.json file create korechi ebong development environment er jonyo development base configuration ar production er jonyo production base configuration kora hobe.
// 16.11 Custom Environment Variables -- etar kaj korechi custom-environment-variables.json file e.