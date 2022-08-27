const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

// import routes
const authRoute = require('./routes/authRoute');

// setup views/template engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// middleware array
const middleware = [
  morgan('dev'),
  express.static('public'),
  express.urlencoded({extended: true}),
  express.json()
]
app.use(middleware);

app.use('/auth', authRoute);



app.get('/', (req,res) => {
  res.send(`<h2>Blogpost-App</h2>`)
})

const PORT = process.env.PORT || 5000

mongoose.connect('mongodb://localhost:27017/blogpost-app')
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