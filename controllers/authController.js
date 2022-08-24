const bcrypt = require('bcrypt');

const User = require('../models/User');

exports.signupGetController = (req,res,next) => {
  res.render('../views/pages/auth/signup.ejs', {title: 'Create a new accont'})
}

exports.signupPostController = async (req,res,next) => {
  // let {username, email, password, confirmPassword} = req.body; validation er somoy confirm password lagbe. apatoto korchi na.
  let {username, email, password} = req.body;

  try {    
  let hashedPassword = await bcrypt.hash(password, 11)

  let user = new User({
    username,
    email,
    password : hashedPassword
  })

    let createdUser = await user.save()
    console.log(
      `User created successfully! User info:
      ${createdUser}`
    );
    res.render('../views/pages/auth/signup.ejs', {title: 'Create a new accont'})
  } catch (error) {
    console.log(`Error occured: ${error}`);
    next(error)
  }
}

exports.loginGetController = (req,res,next) => {
  res.render('../views/pages/auth/login.ejs', {title: 'Log in'})
}

exports.loginPostController = async (req,res,next) => {
  let {email, password} = req.body
  try {
    let user = await User.findOne({email})

    if(!user) {
      return res.json({
        message: `User Not Found`
      })
    }

    let match = await bcrypt.compare(password, user.password)
    if (!match) {
      return res.json({
        message: `Password didn't Match`
      })
    }
    console.log(
      `successfully login by:
      ${user}`
    );
      res.render('../views/pages/auth/login.ejs', {title: 'Log in'})
  } catch (error) {
    console.log(`Error occured: ${error}`);
    next(error)
  }
}

exports.logoutController = (req,res,next) => {
  
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