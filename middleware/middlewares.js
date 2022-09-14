const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');
// const config = require('config');
const { bindUserWithRequest } = require('./authMiddleware');
const setLocals = require('./setLocals');

const store = new MongoDBStore({
  // uri: config.get('db-uri'),
  uri: 'mongodb://localhost:27017/blogpost-app',
  collection: 'sessions',
  expires: 1000 * 60 * 60 * 2
});

const middlewares = [
  morgan('dev'),
  express.static('public'),
  express.urlencoded({extended: true}),
  express.json(),
  session({
    // secret: config.get('secret') || 'keyboard cat',
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: store,
  }),
  bindUserWithRequest(),
  setLocals(),
  flash()
]

module.exports = app => {
  middlewares.forEach(middleware => {
    app.use(middleware)
  })
}

// 17.9 Separate Route and Middleware File -- ekhane sudhu middlewares er kaj korechi.
// 17.10 404 Not Found -- etar kaj korechi views folder er pages folder modhye e error namok folder er 404.ejs file e & index.js.
// 17.11 500 Internal Server Error -- etar kaj korechi views folder er pages folder modhye e error namok folder er 500.ejs file e & index.js.

// 18.1 intro
// 18.2 What is Multer -- multipart form data dealing middleware base function.
// 18.3 Setup Playground -- etar jonyo kaj korechi playground folder er play.js e & views er playground er play.ejs e.