const express = require('express');
const app = express();

app.get('/', (req,res) => {
  res.json({
    message: 'Hello World'
  })
})

const PORT = process.env.PORT

app.listen(PORT, ()=> {
  console.log(`Server running successfully on port: ${port}`);
})

// 11.4 Create Project Structures
// 12.1 Finding Model at begining is important
// 12.2 Models in Our Project
// 12.3 Relationship between our models
// 12.4 User Model -- etar kaj korechi models folder er user namok model file e.