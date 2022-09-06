const express = require('express');
const app = express();
const MongoDB_URI = 'mongodb://localhost:27017/blogpost-app'
const morgan = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');

const store = new MongoDBStore({
  uri: MongoDB_URI,
  collection: 'sessions',
  expires: 1000 * 60 * 60 * 2
});

// import routes
const authRoute = require('./routes/authRoute');
const dashboardRoute = require('./routes/dashboardRoute');

// playground routes
const validatorRoute = require('./playground/validator');

// setup views/template engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// import custom project middleware
const { bindUserWithRequest } = require('./middleware/authMiddleware');
const setLocals = require('./middleware/setLocals');

// middleware array
const middleware = [
  morgan('dev'),
  express.static('public'),
  express.urlencoded({extended: true}),
  express.json(),
  session({
    secret: process.env.SECRET_KEY || 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: store,
  }),
  bindUserWithRequest(),
  setLocals(),
  flash()
]
app.use(middleware);

app.use('/auth', authRoute);
app.use('/dashboard', dashboardRoute);
app.use('/playground', validatorRoute);

app.get('/', (req,res) => {
  res.send(`<h2>Blogpost-App</h2>`)
})

const PORT = process.env.PORT || 5000

mongoose.connect(MongoDB_URI, {
  useNewUrlParser: true
})
        .then(()=> {
          console.log(`Database connected!`);
          app.listen(PORT, ()=> {
            console.log(`Server running successfully on port: ${PORT}`);
          })
        })
        .catch(error => {
          return console.log(error);
        })

// 11.4 Create Project Structures
// 12.1 Finding Model at begining is important
// 12.2 Models in Our Project
// 12.3 Relationship between our models
// 12.4 User Model -- etar kaj korechi models folder er user namok model file e.