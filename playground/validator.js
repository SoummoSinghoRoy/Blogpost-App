// 14.4 Create Playground for Validator -- valdation kaj korar jonyo je page gulo drkr tar jonyo views er modhye alada playground namok ar ekta folder rekhechi. jodi real project e evabe hobe na. sekhar jonyo evabe korchi.

const router = require('express').Router();

router.get('/validator', (req,res,next)=>{
  res.render('../views/playground/signup.ejs', {title: 'validator playground'});
})

router.post('/validator', (req,res,next)=>{})

module.exports = router;