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


// 15.10 SetLocals Middleware -- etar kaj korechi setLocalas.js namok file e
// 15.12 IsAuthenticated Middleware -- ei middleware er modhyey isAuthentcated namok module e kaj kora hoyeche etar jonyo & jehetu ei module dara dashboard er route protect kora hoyeche tai as a middleware eta dashboardRoute.js e import kore use kora hoyeche. 