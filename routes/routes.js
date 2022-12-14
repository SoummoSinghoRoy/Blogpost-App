const authRoute = require('./authRoute');
const dashboardRoute = require('./dashboardRoute');
const playgroundRoute = require('../playground/play');
const uploadRoute = require('./uploadRoute');
const postRoute = require('./postRoute');
const explorerRoute = require('./explorerRoute');
const searchRoute = require('./searchRoute');
const authorRoute = require('./authorRoute');
const apiRoutes = require('../api/routes/apiRoutes');

const routes = [
  {
    path: '/auth',
    handler: authRoute
  },
  {
    path: '/dashboard',
    handler: dashboardRoute
  },
  {
    path: '/uploads',
    handler: uploadRoute
  },
  {
    path: '/posts',
    handler: postRoute
  },
  {
    path: '/explorer',
    handler: explorerRoute
  },
  {
    path: '/search',
    handler: searchRoute
  },
  {
    path: '/author',
    handler: authorRoute
  },
  {
    path: '/api',
    handler: apiRoutes
  },
  {
    path: '/playground',
    handler: playgroundRoute 
  },
  {
    path: '/',
    handler: (req,res) => {
      res.redirect('/explorer')
    }
  }
]

module.exports = app => {
  routes.forEach(route => {
    if (route.path == '/') {
      app.get(route.path, route.handler)
    } else {
      app.use(route.path, route.handler)
    }
  })
}

// 17.9 Separate Route and Middleware File -- ekhane sudhu routes er kaj korechi. middlewares er kaj korechi middlewares folder modhye middlewares.js namok file e.