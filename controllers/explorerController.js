const Flash = require('../utils/Flash');

exports.explorerGetController = (req, res, next) => {
  res.render('../views/pages/explorer/explorer.ejs', {
    title: 'Explore all post',
    filter: 'latest',
    flashMessage: Flash.getMessage(req)

  })
}

// 22.1 Setup explorer files -- explorerGetController er modhye kaj kora hoyeche ebong er route handle kora hoyeche routes --> explorerRoute.js e.