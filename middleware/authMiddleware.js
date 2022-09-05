// 15.9 Bind User with Request Middleware -- ekhane sob kaj korechi & import korechi index.js e.
const User = require('../models/User');

exports.bindUserWithRequest = () => {
  return async (req, res, next) => {
    if (!req.session.isloggedIn) {
      return next()
    }
    try {
      let user = await User.findById(req.session.user._id)
      req.user = user
      next()
    } catch (error) {
      console.log(error);
      next(error)
    }
  }
}

exports.isAuthenticated = (req, res, next) => {
  if(!req.session.isloggedIn) {
    return res.redirect('/auth/login')
  }
  next()
}

exports.isUnAuthenticated = (req,res, next) => {
  if(req.session.isloggedIn) {
    return res.redirect('/dashboard')
  }
  next()
}


// 15.10 SetLocals Middleware -- etar kaj korechi setLocalas.js namok file e
// 15.12 IsAuthenticated Middleware -- ei middleware er modhyey isAuthentcated namok module e kaj kora hoyeche etar jonyo & jehetu ei module dara dashboard er route protect kora hoyeche tai as a middleware eta dashboardRoute.js e import kore use kora hoyeche. 
// 15.13 Logout -- etar jonyo kaj korechi navigation.ejs & authController.js er logoutController e.

// task: jokhon kono user login obsthai thakbe tokhony dashboard page visible hobe with menu. but login na thakleo bortomane dashboard dekhte pache kintu take to dekhano jabe na dashboard page / menu. se sudhu login & signup tuku dekhte parbe. -- done

// 15.14 Unauthenticated Middleware -- etar kaj kora hoyeche authMiddleware.js er modhye ekti module hisebe ebong import korechio authRoute e.