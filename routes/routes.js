const authRoute = require('./authRoute');
const dashboardRoute = require('./dashboardRoute');
const playgroundRoute = require('../playground/play');

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
    path: '/playground',
    handler: playgroundRoute 
  },
  {
    path: '/',
    handler: (req,res) => {
      res.send(`<h2>Blogpost-App</h2>`)
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