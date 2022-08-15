const express = require('express');
const app = express();
const morgan = require('morgan');

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

app.get('/', (req,res) => {
  res.render('pages/auth/signup', {title: 'Create a new account'})
})

const PORT = process.env.PORT || 5000

app.listen(PORT, ()=> {
  console.log(`Server running successfully on port: ${PORT}`);
})

// 11.4 Create Project Structures
// 12.1 Finding Model at begining is important
// 12.2 Models in Our Project
// 12.3 Relationship between our models
// 12.4 User Model -- etar kaj korechi models folder er user namok model file e.