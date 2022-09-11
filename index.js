require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('config');
const chalk = require('chalk');
const setRoutes = require('./routes/routes');
const setMiddlewares = require('./middleware/middlewares');

// setup views/template engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// using middleware from middleware directory
setMiddlewares(app)

// using route from route directory
setRoutes(app)


const PORT = process.env.PORT || 5000

mongoose.connect(config.get('db-uri'), {
  useNewUrlParser: true
})
        .then(()=> {
          console.log(chalk.greenBright(`Database connected!`));
          app.listen(PORT, ()=> {
            console.log(chalk.greenBright(`Server running successfully on port: ${PORT}`));
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