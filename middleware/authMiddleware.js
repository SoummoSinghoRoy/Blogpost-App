// 15.9 Bind User with Request Middleware -- ekhane sob kaj korechi & import korechi index.js e.
const User = require('../models/User');

exports.bindUserWithRequest = async () => {
  return (req, res, next) => {
    if (!req.session.isloggedIn) {
      return next()
    }
    try {
      let user = User.findById(req.session.user._id)
      req.user = user
      next()
    } catch (error) {
      console.log(error);
      next(error)
    }
  }
}

// 15.10 SetLocals Middleware -- etar kaj korechi setLocalas.js namok file e