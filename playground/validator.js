// 14.4 Create Playground for Validator -- valdation kaj korar jonyo je page gulo drkr tar jonyo views er modhye alada playground namok ar ekta folder rekhechi. jodi real project e evabe hobe na. sekhar jonyo evabe korchi.

const router = require('express').Router();
const {check, validationResult} = require('express-validator');

router.get('/validator', (req,res,next)=>{
  res.render('../views/playground/signup.ejs', {title: 'validator playground'});
})

router.post('/validator', 
[
  check('username')
      .not()
      .isEmpty()
      .withMessage(`username can't be empty`)
      .isLength({max: 15})
      .withMessage(`username can't greater than 15`),
  check('email')
      .isEmail()
      .withMessage(`provide a valid email`),
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
  let formatter = (error) => error.msg
  console.log(errors.formatWith(formatter).mapped());
  res.render('../views/playground/signup.ejs', {title: 'validator playground'});
})

module.exports = router;

// 14.5 Validation Check with Error Message
// 14.6 Error Message with Formatter 
// 14.7 Custom validation 