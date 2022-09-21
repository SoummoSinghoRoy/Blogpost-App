const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator');
const errorFormatter = require('../utils/validationErrorFormatter');
const flash = require('../utils/Flash');

const User = require('../models/User');

exports.signupGetController = (req,res,next) => {
  res.render('../views/pages/auth/signup.ejs', 
  {
    title: 'Create a new accont', 
    error: {}, 
    value: {},
    flashMessage: flash.getMessage(req)
  })
}

exports.signupPostController = async (req,res,next) => {
  let {username, email, password} = req.body;

  let errors = validationResult(req).formatWith(errorFormatter)
  if(!errors.isEmpty()) {
    req.flash('fail', 'Something wrong! check your form')
    return res.render('../views/pages/auth/signup.ejs', { 
      title: 'Create a new accont', 
      error: errors.mapped(), 
      value: {
        username, email, password
      },
      flashMessage: flash.getMessage(req)
    })
  }

  try {    
  let hashedPassword = await bcrypt.hash(password, 11)

  let user = new User({
    username,
    email,
    password : hashedPassword
  })
    await user.save()
    req.flash('success', 'User created succefully!')
    res.redirect('/auth/login')
  } catch (error) {
    next(error)
  }
}

exports.loginGetController = (req,res,next) => { 

  res.render('../views/pages/auth/login.ejs', 
  {
    title: 'Login to your account', 
    error: {}, 
    value: {},
    flashMessage: flash.getMessage(req)
  })
}

exports.loginPostController = async (req,res,next) => {
  let {email, password} = req.body
  let errors = validationResult(req).formatWith(errorFormatter);
  if(!errors.isEmpty()) {
    req.flash('fail', 'Something wrong! check your form')
    return res.render('../views/pages/auth/login.ejs', 
    {
      title: 'Login to your account', 
      error: errors.mapped(),
      flashMessage: flash.getMessage(req)
    })
  }
  try {
    let user = await User.findOne({email})

    if(!user) {
      req.flash('fail', 'Provide your valid username')
      return res.render('../views/pages/auth/login.ejs', 
      {
        title: 'Login to your account', 
        error: {},
        flashMessage: flash.getMessage(req)
      })
    }

    let match = await bcrypt.compare(password, user.password)
    if (!match) {
      req.flash('fail', 'Provide your valid password')
      return res.render('../views/pages/auth/login.ejs', 
      {
        title: 'Login to your account', 
        error: {},
        flashMessage: flash.getMessage(req)
      })
    }
    req.session.isloggedIn = true
    req.session.user = user
    req.session.save(error => {
      if(error) {
        return next(error)
      }
      req.flash('success', 'Successfully logged in')
      res.redirect('/dashboard')
    })
  } catch (error) {
    next(error)
  }
}

exports.logoutController = (req,res,next) => {
  req.session.destroy(error => {
    if(error) {
      return next(error)
    }
    return res.redirect('/auth/login')
  })
}

// views er modhye pages folder e auth namok ekta folder theke authentication onujaiyi je response render hobe. tar template toiry kora hoyeche.

// 13.2 Setup App For EJS -- ekhane kichu middleware setup kora hoyeche, template engine configure kora hoyeche ebong publicly je page serve kora hobe tar configure kora hoyeche. wgulo sob kaj kora hoyeche index.js e
// 13.3 Setup Partials -- etar jonyo partials er header, footer, navigation e kaj korechi.
// 13.4 Create Signup View -- etar jonyo views er pages er auth er signup template e kaj kora hoyeche.
// 13.5 Signup Controller -- signupGetController, signupPostController & database e save rakhar korechi.
// 13.6 Connect Database and Create User -- db te connection & user er instance create kore model er document hisebe save korechi  
// 13.7 Hash Password -- signup post controller e bcrypt er kaj kora hoyeche.
// 13.8 create log in page view -- login.ejs e kaj kora hoyeche.
// 13.9 Login Controller -- ekhane log in succefully korte pare jeno ekjon user se kaj kora hoyeche.
// 13.10 Conclusion
// 14.1 what is validation?
// 14.2 Validation Techniques
// 14.3 Express Validator
// 14.4 Create Playground for Validator -- etar kaj korechi playground folder er validator.js namok file e.

// 14.11 Show Error Message to User -- er jonyo controller + signup.ejs file e kaj korechi
// 14.12 Render Submitted Data Back -- er jonyo controller + signup.ejs file e kaj korechi kichu
// 14.13 Separte Validator -- validator folder er modhye auth namok ekta folder korechi jar modhye signup, login er jonyo validation file thakbe ebong jar jar file e se onujayi validation code likhbo.

// 15.4 Config Cookies
// 15.6 Create And Configure Session -- eta install korar por import & configure korechi index.js e  ar session niye kaj korechi authController.js e karon controller e sokol kaj kora hobe.
// 15.7 Connect Mlab Databse with Compass
// 15.8 Session Store -- session store korar jonyo connect-mpngodb-session module use korechi ja import korechi & configuration korechi index.js e.
// 15.9 Bind User with Request Middleware -- etar jonyo middleware folder e authMiddleware.js namok file create kore tar modhye sob kaj korechi.