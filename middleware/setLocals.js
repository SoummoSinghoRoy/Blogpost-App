const cheerio = require('cheerio');
const moment = require('moment');

module.exports = () => {
  return (req, res, next) => {
    res.locals.user = req.user
    res.locals.isloggedIn = req.session.isloggedIn
    res.locals.truncate = (html) => {
      let node = cheerio.load(html)
      let text = node.text()
      text = text.replace(/(\r\r|\n|\r)/gm, '')

      if(text.length <= 100) return text
      return text.substring(0, 100) + '...'
    }
    res.locals.moment = (time) => moment(time).fromNow()
    next()
  }
}

// 15.10 SetLocals Middlewar -- etake index.js e import korechi.
// 15.11 Create Dashboard Page -- etar kaj kora hoyeche dashboardRoute.js file theke. 