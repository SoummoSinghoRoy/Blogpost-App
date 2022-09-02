// 15.10 SetLocals Middlewar -- etake index.js e import korechi.

module.exports = () => {
  return (req, res, next) => {
    res.locals.user = req.user
    res.locals.isloggedIn = req.session.isloggedIn
    next()
  }
}

